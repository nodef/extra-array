/**
 * Appends arrays to the end.
 * @param {Array} x an array
 * @param {...Iterable} ys arrays to append
 * @returns {Array}
 */
function concat(x, ...ys) {
  return x.concat(...ys);
}
module.exports = concat;
