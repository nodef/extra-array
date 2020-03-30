/**
 * Gets values from the right.
 * @param {Array} x an array
 * @param {number?} n number of values (1)
 * @returns {Array}
 */
function right(x, n=1) {
  return x.slice(x.length-n);
}
module.exports = right;
