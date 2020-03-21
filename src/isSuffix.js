const isSuffixBy = require('./isSuffixBy');
const isSuffixOn = require('./isSuffixOn');

/**
 * Checks if array ends with a suffix.
 * @param {Array} x an array
 * @param {Array} y suffix?
 * @param {function?} fc compare function (a, b)
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean}
 */
function isSuffix(x, y, fc=null, fm=null, ths=null) {
  if(fm) return isSuffixOn(x, y, fm, ths);
  return isSuffixBy(x, y, fc);
}
module.exports = isSuffix;
