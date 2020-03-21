const compare = require('./compare');
const id = require('./_id');

/**
 * Checks if array has a permutation.
 * @param {Array} x an array
 * @param {Array} y permutation?
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean}
 */
function isPermutationOn(x, y, fn=null, ths=null) {
  var fn = fn||id;
  var x1 = x.map(fn, ths).sort();
  var y1 = y.map(fn, ths).sort();
  return compare(x1, y1)===0;
}
module.exports = isPermutationOn;
