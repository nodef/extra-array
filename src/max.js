const maxBy = require('./maxBy');
const maxOn = require('./maxOn');

/**
 * Finds largest value.
 * @param {Array} x an array
 * @param {function?} fc compare function (a, b)
 * @param {function?} fm map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {*}
 */
function max(x, fc=null, fm=null, ths=null) {
  if(fm) return maxOn(x, fm, ths);
  return maxBy(x, fc);
}
module.exports = max;
