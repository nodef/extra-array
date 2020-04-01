const id = require('./_id');
const isSubsequence = require('./isSubsequence');

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
  return isSubsequence(x1, y1);
}
module.exports = isPermutationOn;
