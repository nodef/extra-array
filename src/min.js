const minBy = require('./minBy');
const minOn = require('./minOn');

/**
 * Finds smallest value.
 * @param {Array} x an array
 * @param {function?} fc compare function (a, b)
 * @param {function?} fm map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {*}
 */
function min(x, fc=null, fm=null, ths=null) {
  if(fm) return minOn(x, fm, ths);
  return minBy(x, fc);
}
module.exports = min;
