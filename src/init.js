/**
 * Gets values except last.
 * @param {Array} x an array
 * @returns {Array}
 */
function init(x) {
  return x.slice(0, -1);
}
module.exports = init;
