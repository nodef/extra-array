const fs    = require('fs');
const build = require('extra-build');

const owner  = 'nodef';
const repo   = build.readMetadata('.').name;
const srcts  = 'index.ts';
const LOCATIONS = [
  'src/index.ts',
];




// Get keywords for main/sub package.
function keywords(ds, less=false) {
  var rkind = /namespace|function/i;
  var ds = less? ds.filter(d => rkind.test(d.kind)) : ds;
  var m  = build.readMetadata('.');
  var s  = new Set([...m.keywords, ...ds.map(d => d.name)]);
  return Array.from(s);
}


// Publish a root package to NPM, GitHub.
function publishRootPackage(ds, ver, typ) {
  var _package = build.readDocument('package.json');
  var _readme  = build.readDocument('README.md');
  var m  = build.readMetadata('.');
  var md = build.readFileText('README.md');
  m.version  = ver;
  m.keywords = keywords(ds);
  if (typ) {
    m.name = `${m.name}.${typ}`;
    m.description = m.description.replace(/\.$/, ` {${typ}}.`);
    md = md.replace(/(unpkg\.com\/)(\S+?)(\/\))/, `$1$2.${typ}$3`);
  }
  build.writeMetadata('.', m);
  build.writeFileText('README.md', md);
  build.publish('.');
  try { build.publishGithub('.', owner); }
  catch {}
  build.writeDocument(_package);
  build.writeDocument(_readme);
}


// Transform JSDoc in .d.ts file.
function transformJsdoc(x, dm) {
  if (!dm.has(x.name)) return null;
  var link = `[📘](https://github.com/${owner}/${repo}/wiki/${x.name})`;
  x.description = x.description.replace(/\[📘\]\(.+?\)/g, '');
  x.description = x.description.trim() + '\n' + link;
  return x;
}


// Bundle script for test or publish.
function bundleScript(ds) {
  var dm = new Map(ds.map(d => [d.name, d]));
  build.exec(`tsc`);
  build.bundleScript(`.build/${srcts}`);
  build.jsdocifyScript('index.d.ts', 'index.d.ts', x => transformJsdoc(x, dm));
}


// Publish root packages to NPM, GitHub.
function publishRootPackages(ds, ver) {
  var m   = build.readMetadata('.');
  var sym = build.symbolname(m.name);
  bundleScript(ds);
  publishRootPackage(ds, ver, '');
  build.webifyScript('index.mjs', 'index.mjs', {format: 'esm'});
  build.webifyScript('index.js',  'index.js',  {format: 'cjs', symbol: sym});
  publishRootPackage(ds, ver, 'web');
}


// Publish docs.
function publishDocs(ds) {
  build.updateGithubRepoDetails({owner, repo, topics: keywords(ds, true)});
  build.generateDocs(`src/${srcts}`);
  build.publishDocs();
}


// Pushish root, sub packages to NPM, GitHub.
function publishPackages(ds) {
  var m   = build.readMetadata('.');
  var ver = build.nextUnpublishedVersion(m.name, m.version);
  publishRootPackages(ds, ver);
}


// Generate wiki for all exported symbols.
function generateWiki(ds) {
  var rkind = /namespace|function/i, useWiki = true;
  var dm = new Map(ds.map(d => [d.name, d]));
  for (var d of ds) {
    var f = `wiki/${d.name}.md`;
    if (!rkind.test(d.kind)) continue;
    if (!fs.existsSync(f))  {
      var txt = build.wikiMarkdown(d, {owner, repo, useWiki});
      build.writeFileText(f, txt);
    }
    else {
      var txt = build.readFileText(f);
      txt = build.wikiUpdateDescription(txt, d);
      txt = build.wikiUpdateCodeReference(txt, d, {owner, repo, useWiki})
      txt = build.wikiUpdateLinkReferences(txt, dm, {owner, repo, useWiki});
      build.writeFileText(f, txt);
    }
  }
}


// Get README index descriptions.
function readmeDescription(d) {
  var rkind = /namespace|function/i;
  var sname = /a?sync$/i;
  if (!rkind.test(d.kind)) return '';
  if (sname.test(d.name) && d.name!=='spawnAsync') return '';
  var a = d.description.replace(/The.+method/, 'This method');
  a = a.replace(', with command-line arguments in ', ' and ');
  a = a.replace(/(\S)`(.*?)`/, '$1 `$2`');
  return a;
}


// Sort docs details by original order.
function compareLocation(a, b) {
  if (a.kind!==b.kind) return 0;
  var alocn = a.location.replace(/.*?@types\/node.*?\:/, 'src/_file.ts:');
  var blocn = b.location.replace(/.*?@types\/node.*?\:/, 'src/_file.ts:');
  var [afile] = alocn.split(':');
  var [bfile] = blocn.split(':');
  return LOCATIONS.indexOf(afile) - LOCATIONS.indexOf(bfile) || alocn.localeCompare(blocn);
}


// Update README.
function updateReadme(ds) {
  var m  = build.readMetadata('.');
  var repo = m.name;
  var ds = ds.slice().sort(compareLocation);
  var dm = new Map(ds.map(d => [d.name, d]));
  var txt = build.readFileText('README.md');
  txt = build.wikiUpdateIndex(txt, dm, readmeDescription);
  txt = build.wikiUpdateLinkReferences(txt, dm, {owner, repo, useWiki: true});
  build.writeFileText('README.md', txt);
}


// Finally.
function main(a) {
  var p  = build.loadDocs([`src/${srcts}`]);
  var ds = p.children.map(build.docsDetails);
  if (a[2]==='wiki') generateWiki(ds);
  else if (a[2]==='readme') updateReadme(ds);
  else if (a[2]==='publish-docs') publishDocs(ds);
  else if (a[2]==='publish-packages') publishPackages(ds);
  else bundleScript(ds);
}
main(process.argv);
