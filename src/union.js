const union$ = require('./union$');

/**
 * Gives union of an array with another.
 * @param {Array} x an array
 * @param {Iterable} y another array
 * @param {function?} fn compare function (a, b)
 * @returns {Array}
 */
function union(x, y, fn=null) {
  return union$(x.slice(), y, fn);
}
module.exports = union;
