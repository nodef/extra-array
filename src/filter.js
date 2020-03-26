/**
 * Keeps values which pass a test.
 * @param {Array} x an array
 * @param {function} fn test function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array}
 */
function filter(x, fn, ths=null) {
  return x.filter(fn, ths);
}
module.exports = filter;
