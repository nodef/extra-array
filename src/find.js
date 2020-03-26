/**
 * Finds leftmost value passing the test.
 * @param {Array} x an array
 * @param {function} fn test function (v, i, x)
 * @param {object?} ths this argument
 * @returns {*}
 */
function find(x, fn, ths=null) {
  return x.find(fn, ths);
}
module.exports = find;
