/**
 * Updates values based on map function.
 * @param {Array} x an array
 * @param {function} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array}
 */
function map(x, fn, ths=null) {
  return x.map(fn, ths);
}
module.exports = map;
