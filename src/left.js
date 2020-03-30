/**
 * Gets values from the left.
 * @param {Array} x an array
 * @param {number?} n number of values (1)
 * @returns {Array}
 */
function left(x, n=1) {
  return x.slice(0, n);
}
module.exports = left;
