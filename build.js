// # browserify
// # uglify
// 1. process .js -> single .js
// 2. process .js + package.json -> package.json
// 3. process .js + README.md -> README.md
// 4. create package and publish
const findNpmPrefix = require('find-npm-prefix');
const recast = require('recast');
const path = require('path');
const fs = require('fs');


// Global variables.
var OPTIONS = {
  dependencies: false,
  devDependencies: false,
  allDependencies: false
};


// Get last value in array.
function last(arr, i=1) {
  return arr[arr.length-i];
};

// Remove value from array.
function remove(arr, val) {
  var i = arr.indexOf(val);
  if(i>=0) arr.splice(i, 1);
  return arr;
};

// Remove values at all indexes.
function removeAtAll(arr, idx) {
  for(var i=idx.length-1; i>=0; i--)
    arr.splice(idx[i], 1);
  return arr;
};

// Get key of value in object.
function keyOf(obj, val) {
  for(var k in obj)
    if(obj[k]===val) return k;
  return null;
};

// Add all values to set.
function addAll(set, vals) {
  for(var v of vals)
    set.add(v);
  return set;
};

// Read json file at path.
function jsonRead(pth) {
  if(!fs.existsSync(pth)) return null;
  return JSON.parse(fs.readFileSync(pth, 'utf8'));
};

// Check if node is function.
function nodeIsFunction(ast) {
  return /Function(Declaration|Expression)/.test(ast.type);
};

// Check if node is assignment.
function nodeIsAssignment(ast) {
  if(ast.type==='VariableDeclarator') return true;
  return ast.type==='AssignmentExpression';
};

// Check if node is require().
function nodeIsRequire(ast) {
  if(ast.type!=='CallExpression') return false;
  return ast.callee.name==='require';
};

// Check if node is exports.
function nodeIsExports(ast) {
  if(ast.type!=='ExpressionStatement') return false;
  if(ast.expression.left.type!=='MemberExpression') return false;
  return ast.expression.left.object.name==='exports';
};

// Check if node is module.exports.
function nodeIsModuleExports(ast) {
  if(ast.type!=='ExpressionStatement') return false;
  if(ast.expression.left.type!=='MemberExpression') return false;
  if(ast.expression.left.object.name!=='module') return false;
  return ast.expression.left.property.name==='exports';
};

// Get assignment name.
function assignmentName(ast) {
  if(ast.type==='VariableDeclarator') return ast.id.name;
  else if(ast.type==='AssignmentExpression') return ast.left.name;
  return null;
};

// Remove an assignment from hierarchy.
function assignmentRemove(asth) {
  var ast1 = last(asth), ast2 = last(asth, 2), ast3 = last(asth, 3);
  if(ast1.type==='AssignmentExpression') remove(ast3, ast2);
  else if(ast1.type==='VariableDeclarator') {
    if(ast2.length>1) remove(ast2, ast1);
    else remove(last(asth, 4), ast3);
  }
  return asth;
};

// Get function parameter name.
function paramName(ast) {
  if(ast.type==='Identifier') return ast.name;
  else if(ast.type==='RestElement') return ast.argument.name;
  else if(ast.type==='AssignmentPattern') return ast.left.name;
  return null;
};

// Get function parameter names.
function functionParams(ast, set=new Set()) {
  for(var p of ast.params)
    set.add(paramName(p));
  return set;
};

// Get variable declaration names.
function variableDeclarationNames(ast, set=new Set()) {
  for(var d of ast.declarations)
    set.add(d.id.name);
  return set;
};

// Get declaration names.
function declarationNames(ast, set=new Set()) {
  if(ast.type==='FunctionDeclaration') set.add(ast.id.name);
  else if(ast.type==='VariableDeclaration') variableDeclarationNames(ast, set);
  return set;
};

// Get global identifier names.
function bodyGlobals(ast, set=new Set()) {
  for(var s of ast)
    declarationNames(s, set);
  return set;
};

// Get empty window identifier map.
function bodyEmptyWindow(ast, win=new Map()) {
  for(var nam of bodyGlobals(ast))
    win.set(nam, []);
  return win;
};

// Get (scanned) window identifier map.
function bodyWindow(ast, win=bodyEmptyWindow(ast), exc=new Set()) {
  if(ast==null || typeof ast!=='object') return win;
  if(nodeIsFunction(ast)) {
    bodyWindow(ast.id, win, exc);
    var excn = functionParams(ast, new Set(exc));
    return bodyWindow(ast.body, win, excn);
  }
  if(ast.type==='Identifier') {
    if(!win.has(ast.name) || exc.has(ast.name)) return win;
    win.get(ast.name).push(ast); return win;
  }
  for(var k in ast)
    bodyWindow(ast[k], win, exc);
  return win;
};

// Get actual name of window identifier.
function windowName(win, nam) {
  if(!win.has(nam)) return nam;
  return win.get(nam)[0].name;
};

// Rename a window identifier.
function windowRename(win, nam, to) {
  for(var ast of win.get(nam))
    ast.name = to;
  return win;
};

// Add window identifier to globals.
function globalsAdd(glo, win, nam, suf) {
  if(!glo.has(nam)) return glo.add(nam);
  if(!glo.has(nam+suf)) {
    windowRename(win, nam, nam+suf);
    return glo.add(nam+suf);
  }
  for(var i=0; glo.has(nam+suf+i); i++) {}
  windowRename(win, nam, nam+suf+i);
  return glo.add(nam+suf+i);
};

// Add all window identifiers to globals.
function globalsAddAll(glo, win, suf) {
  for(var nam of win.keys())
    globalsAdd(glo, win, nam, suf);
  return glo;
};

// Update exports to given name.
function bodyUpdateExports(ast, nam) {
  for(var i=ast.length-1, idx=-1; i>=0; i--) {
    if(!nodeIsExports(ast[i])) continue;
    ast[idx=i].expression.left.object.name = nam;
  }
  if(idx<0) return null;
  var astn = recast.parse(`\nconst ${nam} = {};`);
  ast.splice(idx, 0, astn.program.body[0]);
  return nam;
};

// Update module.exports to given name, if possible.
function bodyUpdateModuleExports(ast, nam) {
  for(var i=ast.length-1, idx=-1, rgt=null; i>=0; i--) {
    if(!nodeIsModuleExports(ast[i])) continue;
    rgt = ast[idx=i].expression.right;
    ast.splice(i, 1);
  }
  if(idx<0) return null;
  if(rgt.type==='Identifier') return rgt.name;
  var astn = recast.parse(`\nconst ${nam} = 0;`);
  astn.program.body[0].declarations[0].init = rgt;
  ast.splice(idx, 0, astn.program.body[0]);
  return nam;
};

// Update require() using module load function.
// : support __dirname, __filename?
function bodyUpdateRequire(ast, astp, fn) {
  if(ast==null || typeof ast!=='object') return ast;
  if(!nodeIsRequire(ast)) {
    astp.push(ast);
    for(var astv of Object.values(ast))
      bodyUpdateRequire(astv, astp, fn);
    return astp.pop();
  }
  var nam = fn(ast.arguments[0].value), ast1 = last(astp);
  if(nam==null) return ast;
  if(nodeIsAssignment(ast1) && assignmentName(ast1)===nam) {
    assignmentRemove(astp); return ast;
  }
  var astr = recast.parse(`const a = ${nam};`);
  ast1[keyOf(ast1, ast)] = astr.program.body[0].declarations[0].init;
  return ast;
};

// Bundle script with options
function bundleScript(pth, sym, exc=new Set(), top=false) {
  var code = fs.readFileSync(pth, 'utf8'), paths = [path.dirname(pth)];
  var ast = recast.parse(code), body = ast.program.body;
  bodyUpdateRequire(body, [], val => {
    if(exc.has(val)) return null;
    var pth = require.resolve(val, {paths});
    if(sym.exports.has(pth)) return sym.exports.get(pth).name;
    return bundleScript(pth, sym, exc);
  });
  var suf = !top? sym.exports.size.toString():'', nam = 'exports'+suf;
  if(!top) nam = bodyUpdateExports(body, nam)||bodyUpdateModuleExports(body, nam);
  var win = bodyWindow(body); globalsAddAll(sym.globals, win, suf);
  sym.exports.set(pth, {name: nam, suffix: suf, code: recast.print(ast).code});
  return windowName(win, nam);
};

// Get exclude set for bundle.
function bundleExclude(pth, opt) {
  var exc = new Set();
  var pkg = jsonRead(path.join(pth, 'package.json'))||{};
  var pkgl = jsonRead(path.join(pth, 'package-lock.json'))||{};
  if(opt.dependencies && pkg.dependencies) addAll(exc, Object.keys(pkg.dependencies));
  if(opt.devDependencies && pkg.devDependencies) addAll(exc, Object.keys(pkg.devDependencies));
  if(opt.allDependencies && pkgl.dependencies) addAll(exc, Object.keys(pkgl.dependencies));
  return exc;
};

async function bundle(fil, o) {
  var o = Object.assign({}, OPTIONS, o), z = '';
  var cwd = process.cwd();
  var pth = path.join(cwd, fil);
  var pfx = await findNpmPrefix(cwd);
  var sym = {exports: new Map(), globals: new Set()};
  var exc = bundleExclude(pfx, o);
  bundleScript(pth, sym, exc, true);
  for(var exp of sym.exports.values())
    z += exp.code;
  return z;
};
module.exports =  bundle;

// Bundle main file.
async function bundleMain() {
  var data = await bundle('src/index.js', {dependencies: true});
  fs.writeFileSync('index.js', data);
};

function replaceKeepBrackets(x, y) {
  var links = new Set();
  var rref = /(.?)\[([\w\s\-$.]+)\](.?)/g, m = null;
  while((m=rref.exec(x))!=null)
    if(m[1]!=='!' && m[3]!=='(') links.add(m[2]);
  for(var l of links)
    y = y.replace(l, `[${l}]`);
  return y;
}

// Reads JSDoc in js file.
function getJsdoc(js) {
  var c = js.replace(/.*?(\/\*\*.*?\*\/).*/s, '$1');
  if(c.length===js.length) return null;
  var description = c.match(/\s+\*\s+(.*?)\n/)[1];
  var rparam = /\s+\*\s+@param\s+(?:\{(.*?)\}\s+)(.*?)\s+(.*?)\n/g;
  var params = new Map(), m = null;
  while((m=rparam.exec(c))!=null)
    params.set(m[2], {type: m[1], description: m[3]});
  var rreturns = /\s+\*\s+@returns\s+(?:\{(.*?)\}\s+)(.*?)\n/;
  m = rreturns.exec(c);
  var returns = m? {type: m[1], description: m[2]}:null;
  var next = js.substring(js.indexOf(c)+c.length);
  var name = next.replace(/.*?function\*?\s+(.*?)\(.*/s, '$1');
  return {description, params, returns, name};
}

// Sets wiki from JSDoc.
function setWiki(md, o) {
  var pre = Math.max(...[...o.params.keys()].map(v => v.length));
  var args = [...o.params].map(([k, v]) => v.type.startsWith('...')? `...${k}`:(v.type.endsWith('?')? `[${k}]`:k));
  var pars = [...o.params].map(([k, v]) => `// ${(k+':').padEnd(pre+2)}${v.description}`);
  var def =
    '```javascript\n'+
    `${o.package}.${o.name}(`+args.join(', ')+`);\n`+
    pars.join('\n')+'\n'+
    (o.returns? `// --> `+o.returns.description+'\n':'')+
    '```\n';
  md = md||'Blank.\n\n```javascript\n```\n';
  md = md.replace(/^.*?\n/, m => replaceKeepBrackets(m, o.description)+'\n');
  md = md.replace(/```javascript[\s\S]*?```\n/, def);
  return md;
}

function setWikiLinks(md, o) {
  var txt = md.replace(/```.*?```/gs, '');
  var links = new Set();
  var rref = /(.?)\[([\w\-$.]+)\](.?)/g, m = null;
  var rlink = /^\[([\w\-$.]+)\]\s*:\s*(.*?)$/gm, m = null;
  while((m=rref.exec(txt))!=null)
    if(m[1]!=='!' && m[3]!=='(') links.add(m[2]);
  while((m=rlink.exec(txt))!=null)
    links.delete(m[1]);
  for(var l of links) {
    console.log('setWikiLinks: '+l);
    md = md+`[${l}]: https://github.com/${o.org}/${o.package}/wiki/${l}\n`;
  }
  return md;
}

// Sets README table from JSDoc.
function setTable(md, os) {
  var i = md.search(/\|\s+Method\s+\|/);
  var top = md.substring(0, i);
  var tab = md.substring(i);
  var I = tab.search(/^[^\|]/m);
  var bot = tab.substring(I);
  var tab = tab.substring(0, I);
  var rrow = /^(\|\s+\[(.*?)\]\s+\|\s+)(.*?)\n/gm, m = null;
  while((m=rrow.exec(tab))!=null) {
    var description = os.get(m[2])? os.get(m[2]).description: m[3];
    tab = tab.replace(m[0], m[1]+description+'\n');
  }
  return top+tab+bot;
}

function getJsdocs(dir) {
  var os = new Map();
  for(var f of fs.readdirSync(dir)) {
    if(!f.endsWith('.js')) continue;
    if(f.startsWith('_')) continue;
    if(f==='index.js') continue;
    var name = f.replace(/[?]*\.js/, '');
    var p = path.join(dir, f);
    var js = fs.readFileSync(p, 'utf8');
    var o = getJsdoc(js);
    if(!o) { console.log('getJsdocs: no jsdoc for '+p); }
    os.set(name, o);
  }
  return os;
}

function setWikis(dir, os, ot) {
  for(var f of fs.readdirSync(dir)) {
    if(!f.endsWith('.md')) continue;
    if(f.startsWith('_')) continue;
    if(f==='Home.md') continue;
    var name = f.replace('.md', '');
    var p = path.join(dir, f);
    var md = fs.readFileSync(p, 'utf8');
    var o = os.get(name);
    if(!o) { console.log('setWikis: no jsdoc for '+p); continue; }
    md = setWiki(md, Object.assign({}, ot, o));
    md = setWikiLinks(md, ot);
    fs.writeFileSync(p, md);
  }
}

function setReadme(os, ot) {
  var p = 'README.md';
  var md = fs.readFileSync(p, 'utf8');
  md = setTable(md, os);
  md = setWikiLinks(md, ot);
  fs.writeFileSync(p, md);
}

function setKeywords(os) {
  var d = fs.readFileSync('package.json', 'utf8');
  var p = JSON.parse(d), {keywords} = p;
  for(var k of os.keys()) {
    var i = keywords.indexOf(k);
    if(i>=0) keywords.length = Math.min(keywords.length, i);
  }
  p.keywords = [...keywords, ...os.keys()];
  var d = JSON.stringify(p, null, 2)+'\n';
  fs.writeFileSync('package.json', d);
}

// Run on shell.
async function main() {
  var pkg = path.basename(__dirname);
  var ot = {org: 'nodef', package: pkg.replace(/.*?-/, '')};
  await bundleMain();
  var os = getJsdocs('src');
  setWikis('wiki', os, ot);
  setReadme(os, ot);
  setKeywords(os);
};
main();
