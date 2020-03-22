const rangeBy = require('./rangeBy');
const rangeOn = require('./rangeOn');

/**
 * Finds smallest and largest values.
 * @param {Array} x an array
 * @param {function?} fc compare function (a, b)
 * @param {function?} fm map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} [min, max]
 */
function range(x, fc=null, fm=null, ths=null) {
  if(fm) return rangeOn(x, fm, ths);
  return rangeBy(x, fc);
}
module.exports = range;
