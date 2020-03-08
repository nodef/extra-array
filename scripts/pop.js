/**
 * Removes last value.
 * @param {Array} x an array
 * @returns {Array} [value, array]
 */
function pop(x) {
  return [x[x.length-1], x.slice(0, -1)];
}
module.exports = pop;
