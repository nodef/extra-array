const isPrefixBy = require('./isPrefixBy');
const isPrefixOn = require('./isPrefixOn');

/**
 * Checks if array starts with a prefix.
 * @param {Array} x an array
 * @param {Array} y prefix?
 * @param {function?} fn compare function (a, b)
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean}
 */
function isPrefix(x, y, fc=null, fm=null, ths=null) {
  if(fm) return isPrefixOn(x, y, fm, ths);
  return isPrefixBy(x, y, fc);
}
module.exports = isPrefix;
