const packageLock = require('./package-lock.json');
const package = require('./package.json');
const fs = require('fs');
const os = require('os');

function createClosure(txt, nam) {
  return `__const__ ${nam} = (function(module, exports) {
  ${txt.replace(/\r?\n/g, '\r\n  ')}
  return module.exports? module.exports:exports;
})({}, {});
module.exports = ${nam};
`;
};

const VARSTART = '(^|[\\s!%&\\(-\\-\\/:-@\\[-\\^\\{-\\~])';
const VARSTOP = '([\\s!%&\\(-\\/:-@\\[-\\^\\{-\\~]|$)';
const REKEY = new Map([
  ['array-allof', 'all'],
  ['array-compactto', 'compact'],
  ['array-containsit', 'contains'],
  ['array-copyto', 'copy'],
  ['array-equalto', 'equal'],
  ['array-everyof', 'every'],
  ['array-filterto', 'filter'],
  ['array-findin', 'find'],
  ['array-findindexof', 'findIndex'],
  ['array-firstof', 'first'],
  ['array-foreachof', 'forEach'],
  ['array-includesit', 'includes'],
  ['array-indexfor', 'indexOf'],
  ['array-is', 'is'],
  ['array-jointo', 'join'],
  ['array-lastof', 'last'],
  ['array-mapto', 'map'],
  ['array-maxof', 'max'],
  ['array-middleof', 'middle'],
  ['array-minof', 'min'],
  ['array-moveto', 'move'],
  ['array-reduceby', 'reduce'],
  ['array-repeatto', 'repeat'],
  ['array-reverseto', 'reverse'],
  ['array-sliceto', 'slice'],
  ['array-someof', 'some'],
  ['array-sortto', 'sort'],
  ['array-sumof', 'sum'],
]);
const ADDKEY = new Map([
]);

var KEYS = new Map();
var VALUES = new Map();
var TEXTS = new Map();

// read text
for(var dep in packageLock.dependencies) {
  var fil = require.resolve(dep);
  var txt = fs.readFileSync(fil, 'utf8');
  TEXTS.set(dep, txt);
}

// rename re-exports
for(var dep in packageLock.dependencies) {
  var txt = TEXTS.get(dep);
  var mat = [], re = /module\.exports\s*=\s*require\([\'\"](.*?)[\'\"].*?([,;]\r?\n?|$)/;
  while((mat=re.exec(txt))!=null) { txt = txt.replace(mat[0], ''); VALUES.set(dep, '##'+mat[1]); }
  TEXTS.set(dep, txt.trim());
}

// rename functions
var i = 0;
for(var dep in packageLock.dependencies) {
  var txt = TEXTS.get(dep);
  if(txt.length===0) { KEYS.set(dep, REKEY.get(dep)||exp); continue; }
  var mat = [], re = /function\*?\s+(\w+)/g, lib = dep in package.devDependencies;
  while((mat=re.exec(txt))!=null) txt = txt.replace(new RegExp(VARSTART+mat[1]+VARSTOP, 'g'), `$1${mat[1]}${i}$2`);
  var sym = (txt.match(/module\.exports\s*=\s*function\*?\s+(\w+)/)||[])[1];
  var sym = sym||(txt.match(/module\.exports\s*=\s*([\w\.]+)/)||[])[1], exp = sym;
  if(sym==null) { exp = dep.replace(/^.*?[\-\.]/, '')+(lib? '':i); txt = createClosure(txt, exp); }
  else if(lib) { exp = sym.replace(new RegExp(`${i}$`), ''); txt = txt.replace(new RegExp(VARSTART+sym+VARSTOP, 'g'), `$1${exp}$2`); }
  if(!KEYS.has(dep)) KEYS.set(dep, REKEY.get(dep)||exp);
  if(!VALUES.has(dep)) VALUES.set(dep, exp);
  TEXTS.set(dep, txt); i++;
}

// rename imports
for(var dep in packageLock.dependencies) {
  var txt = TEXTS.get(dep);
  var mat = [], re = /(const|var)\s+(\w+)\s*=\s*require\([\'\"](.*?)[\'\"].*?([,;]\r?\n?|$)/;
  while((mat=re.exec(txt))!=null) {
    txt = txt.replace(mat[0], '');
    txt = txt.replace(new RegExp(VARSTART+mat[2]+VARSTOP, 'g'), '$1'+VALUES.get(mat[3])+'$2');
  }
  TEXTS.set(dep, txt);
}

// rename globals
var i = 0;
for(var dep in packageLock.dependencies) {
  var txt = TEXTS.get(dep);
  var mat = [], re = /^(const|var)\s+(\w+)/;
  while((mat=re.exec(txt))!=null) txt = txt.replace(new RegExp(VARSTART+mat[2]+VARSTOP, 'g'), `$1${mat[2]+i}$2`);
  TEXTS.set(dep, txt); i++;
}

// fix closure
for(var dep in packageLock.dependencies) {
  var txt = TEXTS.get(dep);
  txt = txt.replace(/__const__/g, 'const');
  TEXTS.set(dep, txt);
}

// fix re-exports
for(var dep in packageLock.dependencies) {
  var val = VALUES.get(dep);
  if(!val.startsWith('##')) continue;
  VALUES.set(dep, VALUES.get(val.substring(2)));
}

// remove exports
for(var dep in packageLock.dependencies) {
  var txt = TEXTS.get(dep);
  txt = txt.replace(/(^|\r?\n)module\.exports\s*=\s*(function\*?.*)/g, '$2');
  txt = txt.replace(/(^|\r?\n)module\.exports\s*=\s*.*/g, '');
  TEXTS.set(dep, txt);
}

// add code
var i = 0, z = '';
for(var dep in packageLock.dependencies) {
  var txt = TEXTS.get(dep).trim();
  if(txt.length) z += `// ${i}. ${dep} (${VALUES.get(dep)})${os.EOL}${txt}${os.EOL}`;
  i++;
}

// export symbols
for(var dep in package.devDependencies)
  z += `Array.${KEYS.get(dep)} = ${VALUES.get(dep)};${os.EOL}`;
for(var [k, v] of ADDKEY)
  z += `Array.${k} = ${v};${os.EOL}`;
z += `module.exports = Array;${os.EOL}`;
fs.writeFileSync('index.js', z);
