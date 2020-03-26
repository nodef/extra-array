/**
 * Adds values to the start.
 * @param {Array} x an array (updated)
 * @param {...any} vs values to add
 * @returns {Array} x
 */
function unshift$(x, ...vs) {
  Array.prototype.unshift.apply(x, vs);
  return x;
}
module.exports = unshift$;
