const tempy = require('tempy');
const cp = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Global variables.
const ORG = 'nodef';
const PACKAGE_ROOT = require('./package.json').name;
const STANDALONE = PACKAGE_ROOT.replace(/extra-/, '').replace(/\W+/, '_');
const BIN = (cp.execSync('npm prefix -g')+'/bin/').replace('\n', '');
const stdio = [0, 1, 2];
const EOL = os.EOL;



function toSnakeCase(x, sep='-') {
  x = x.replace(/([a-z0-9])([A-Z])/g, '$1'+sep+'$2');
  x = x.replace(/[^A-Za-z0-9\.]+/g, sep);
  x = x.replace(/^[^A-Za-z0-9\.]+/, '');
  x = x.replace(/[^A-Za-z0-9\.]+$/, '');
  return x.toLowerCase();
}

function pathSplit(x) {
  var d = path.dirname(x);
  var e = path.extname(x);
  var f = x.substring(d.length, x.length-e.length).replace(/^\//, '');
  return [d, f, e];
}

function fsReadDir(pth) {
  return fs.existsSync(pth)? fs.readdirSync(pth):[];
}

// Get filename.
function resolve(pth) {
  var ext = path.extname(pth);
  return ['.js', '.ts', '.json'].includes(ext)? pth:pth+'.js';
}

// Get path to root package.
function packageRoot(pth) {
  while(!fs.existsSync(path.join(pth, 'package.json')))
    pth = path.dirname(pth);
  return pth;
}

// Gets requires from code.
function packageRequires(pth, a=[]) {
  var d = fs.readFileSync(resolve(pth), 'utf8');
  var re = re = /require\(\'(.*?)\'\)/g;
  for(var m=null, reqs=[]; (m=re.exec(d))!=null;)
  { reqs.push(m[1]); a.push(m[1]); }
  if(reqs.length===0) return a;
  var dir = path.dirname(pth);
  for(var p of reqs)
    if(/^\./.test(p)) packageRequires(path.join(dir, p), a);
  return a;
}

// Download README.md from wiki.
function downloadReadme(pth, o) {
  console.log('downloadReadme:', pth, o);
  var wiki = 'https://raw.githubusercontent.com/wiki/';
  var url = `${wiki}${o.org}/${o.package_root}/${o.readme}.md`;
  cp.execSync(BIN+`download ${url} > ${pth}`, {stdio});
}

function readmeHeading(pth) {
  console.log('readmeHeading:', pth);
  var d = fs.readFileSync(pth, 'utf8');
  return d.replace(/\r?\n[\s\S]*/, '').replace(/[\_\*\[\]]/g, '');
}

// Update README.md based on scatter options.
function scatterReadme(pth, o) {
  console.log('scatterReadme:', pth, o);
  var d = fs.readFileSync(pth, 'utf8');
  d = d.replace(o.note_top||/\s+```/, '<br>'+EOL+
    `> This is part of package [${o.package_root}].`+EOL+EOL+
    `[${o.package_root}]: https://www.npmjs.com/package/${o.package_root}`+EOL+EOL+
    (o.note_topvalue||'```')
  );
  fs.writeFileSync(pth, d);
}

// Update index.js to use README.md
function scatterJs(pth, o) {
  console.log('scatterJs:', pth, o);
  var d = fs.readFileSync(pth, 'utf8');
  d = d.replace(new RegExp(`less (.*?)${o.readme}.md`, 'g'), `less $1README.md`);
  fs.writeFileSync(pth, d);
}

// Update package.json based on scatter options.
function scatterJson(pth, o) {
  console.log('scatterJson:', pth, o);
  var d = JSON.parse(fs.readFileSync(pth, 'utf8'));
  d.name = `@${o.package_root}/${o.package}`;
  d.description = o.description;
  d.main = o.main||'index.js';
  d.scripts = {test: 'exit'};
  d.keywords.push(...o.package.split(/\W/));
  d.keywords = Array.from(new Set(d.keywords));
  d.dependencies = Object.assign({}, o.dependencies, o.devDependencies);
  var dep_pkgs = Object.keys(d.dependencies)||[];
  for(var p of dep_pkgs)
    if(!o.requires.includes(p)) d.dependencies[p] = undefined;
  d.devDependencies = undefined;
  fs.writeFileSync(pth, JSON.stringify(d, null, 2));
}

// Scatter a file as a package.
function scatterPackage(pth, o) {
  console.log('scatterPackage:', pth, o);
  var o = Object.assign({}, o);
  var tmp = tempy.directory();
  var [dir, fil, ext] = pathSplit(pth);
  var src = packageRoot(pth);
  var nam = fil.replace(/\$/g, 'Update');
  var json_src = path.join(src, 'package.json');
  var readme = path.join(tmp, 'README.md');
  var index = path.join(tmp, 'index'+ext);
  var json = path.join(tmp, 'package.json');
  o.package = o.package||toSnakeCase(nam);
  o.readme = o.readme||fil.replace(/[?]+$/, '');
  downloadReadme(readme, o);
  o.description = o.description||readmeHeading(readme);
  scatterReadme(readme, o);
  fs.copyFileSync(pth, index);
  scatterJs(index, o);
  o.requires = packageRequires(pth);
  fs.copyFileSync(json_src, json);
  scatterJson(json, o);
  for(var r of o.requires) {
    if(!(/^[\.\/]/).test(r)) continue;
    r = resolve(r);
    var src = path.join(dir, r);
    var dst = path.join(tmp, r);
    fs.copyFileSync(src, dst);
  }
  return tmp;
}

// Minifies JS file in place.
function minifyJs(pth, o) {
  console.log('minifyJs: ', pth, o);
  var s = fs.statSync(pth);
  cp.execSync(BIN+`browserify ${pth} -s ${o.standalone} -o ${pth}.tmp`, {stdio});
  if(s.size<4*1024*1024) cp.execSync(BIN+`uglifyjs -c -m -o ${pth} ${pth}.tmp`, {stdio});
  else cp.execSync(`mv ${pth}.tmp ${pth}`, {stdio});
  cp.execSync(`rm -f ${pth}.tmp`, {stdio});
}

// Adds minified message to README.md in place.
function minifyReadme(pth, o) {
  console.log('minifyReadme: ', pth, o);
  var d = fs.readFileSync(pth, 'utf8');
  d = d.replace(o.note_minified||/^> .*?minified.*$/m, '');
  d = d.replace(o.note_top||/\s+```/, '<br>'+EOL+
    `> This is browserified, minified version of [${o.package}].<br>`+EOL+
    `> It is exported as global variable **${o.standalone}**.<br>`+EOL+
    `> CDN: [unpkg], [jsDelivr].`+EOL+EOL+
    `[${o.package}]: https://www.npmjs.com/package/${o.package}`+EOL+
    `[unpkg]: https://unpkg.com/${o.package}.min`+EOL+
    `[jsDelivr]: https://cdn.jsdelivr.net/npm/${o.package}.min`+EOL+EOL+
    (o.note_topvalue||'```')
  );
  fs.writeFileSync(pth, d);
}

// Adds minified message to package.json in place.
function minifyJson(pth, o) {
  console.log('minifyJson: ', pth, o);
  var d = JSON.parse(fs.readFileSync(pth, 'utf8'));
  d.name += '.min';
  d.description = d.description.replace('.$', ' (browserified, minifined).');
  d.scripts = {test: 'exit'};
  d.devDependencies = undefined;
  fs.writeFileSync(pth, JSON.stringify(d, null, 2));
  return d.name.replace(/\.min$/, '');
}

// Minifies package in place.
function minifyPackage(pth, o) {
  console.log('minifyPackage: ', pth, o);
  var o = Object.assign({}, o);
  o.package = minifyJson(path.join(pth, 'package.json'), o);
  minifyReadme(path.join(pth, 'README.md'), o);
  minifyJs(path.join(pth, 'index.js'), o);
}

// Run on shell.
async function main(a) {
  console.log('main:', a);
  console.log({BIN, ORG, PACKAGE_ROOT, STANDALONE});
  var o = {org: ORG, package_root: PACKAGE_ROOT};
  for(var f of fsReadDir('src')) {
    if(path.extname(f)!=='.js') continue;
    if(f.startsWith('_')) continue;
    if(f==='index.js') continue;
    try {
    var pth = path.join('src', f);
    var tmp = scatterPackage(pth, o);
    cp.execSync('npm publish', {cwd: tmp, stdio});
    var standalone = toSnakeCase(f.replace(/\..*/, ''), '_');
    standalone = STANDALONE+'_'+standalone;
    minifyPackage(tmp, Object.assign({standalone}, o));
    cp.execSync('npm publish', {cwd: tmp, stdio});
    cp.execSync(`rm -rf ${tmp}`);
    }
    catch(e) { console.error(e); }
  }
  standalone = STANDALONE;
  minifyPackage('.', Object.assign({standalone}, o));
  cp.execSync('npm publish', {stdio});
}
if(require.main===module) main(process.argv);
