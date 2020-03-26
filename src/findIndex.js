/**
 * Finds index of leftmost value passing the test.
 * @param {Array} x an array
 * @param {function} fn test function (v, i, x)
 * @param {object?} ths this argument
 * @returns {number} index of value, -1 if not found
 */
function findIndex(x, fn, ths=null) {
  return x.findIndex(fn, ths);
}
module.exports = findIndex;
