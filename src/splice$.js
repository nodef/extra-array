/**
 * Removes or replaces existing values.
 * @param {Array} x an array (updated)
 * @param {number} i remove index
 * @param {number?} n number of values to remove (rest)
 * @param {...any} vs values to insert
 * @returns {Array} removed
 */
function splice$(x, i, n=x.length-i, ...vs) {
  return x.splice(i, n, ...vs);
}
module.exports = splice$;
