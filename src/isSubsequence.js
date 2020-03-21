const isSubsequenceBy = require('./isSubsequenceBy');
const isSubsequenceOn = require('./isSubsequenceOn');

/**
 * Checks if array has a subsequence.
 * @param {Array} x an array
 * @param {Array} y subsequence?
 * @param {function?} fc compare function (a, b)
 * @param {function?} fm map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean}
 */
function isSubsequence(x, y, fc=null, fm=null, ths=null) {
  if(fm) return isSubsequenceOn(x, y, fm, ths);
  return isSubsequenceBy(x, y, fc);
}
module.exports = isSubsequence;
