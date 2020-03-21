const isUniqueBy = require('./isUniqueBy');
const isUniqueOn = require('./isUniqueOn');

/**
 * Checks if there are no duplicate values.
 * @param {Array} x an array
 * @param {function?} fc compare function (a, b)
 * @param {function?} fm map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean}
 */
function isUnique(x, fc=null, fm=null, ths=null) {
  if(fm) return isUniqueOn(x, fm, ths);
  return isUniqueBy(x, fc);
}
module.exports = isUnique;
