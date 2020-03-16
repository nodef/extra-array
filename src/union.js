const union = require('./union$');

/**
 * Gives union of first array with another.
 * @param {Array} x an array
 * @param {Array} y another array
 * @param {function?} fn compare function (a, b)
 * @returns {Array} x
 */
function union(x, y, fn) {
  return union$(x.slice(), y, fn);
}
module.exports = union;
