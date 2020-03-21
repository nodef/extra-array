const isPermutationBy = require('./isPermutationBy');
const isPermutationOn = require('./isPermutationOn');

/**
 * Checks if array has a permutation.
 * @param {Array} x an array
 * @param {Array} y permutation?
 * @param {function?} fc combine function (a, b)
 * @param {function?} fm map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean}
 */
function isPermutation(x, y, fc=null, fm=null, ths=null) {
  if(fm) return isPermutationOn(x, y, fm, ths);
  return isPermutationBy(x, y, fc);
}
module.exports = isPermutation;
