/**
 * Removes first value.
 * @param {Array} x an array
 * @returns {Array} [value, array]
 */
function shift(x) {
  return [x[0], x.slice(1)];
}
module.exports = shift;
