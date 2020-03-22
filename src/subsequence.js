const permutation$ = require('./permutation$');
const getAll = require('./getAll');
const random = require('./_random');
const arange = require('./_arange');

function subsequenceNum(x, n, r) {
  var is = arange(0, x.length);
  permutation$(is, n, r).sort();
  return getAll(x, is);
}

function subsequenceAny(x, r) {
  var rnd = random(r), a = [];
  for(var v of x)
    if(rnd()>=0.5) a.push(v);
  return a;
}

/**
 * Gives an arbitrary subsequence.
 * @param {Array} x an array
 * @param {number?} n number of values (-1 => any)
 * @param {number?} r random seed 0->1
 * @returns {Array}
 */
function subsequence(x, n=-1, r=Math.random()) {
  var X = x.length;
  if(n>=0) return n>X? null:subsequenceNum(x, n, r);
  return subsequenceAny(x, r);
}
module.exports = subsequence;
