/**
 * Gets values from middle.
 * @param {Array} x an array
 * @param {number?} i start index (0)
 * @param {number?} n number of values (1)
 * @returns {Array}
 */
function middle(x, i=0, n=1) {
  return x.slice(i, i+n);
}
module.exports = middle;
