const uniqueBy = require('./uniqueBy');
const uniqueOn = require('./uniqueOn');

/**
 * Removes duplicate values.
 * @param {Array} x an array
 * @param {function?} fc compare function (a, b)
 * @param {function?} fm map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array}
 */
function unique(x, fc=null, fm=null, ths=null) {
  if(fm) return uniqueOn(x, fm, ths);
  return unique(x, fc);
}
module.exports = unique;
