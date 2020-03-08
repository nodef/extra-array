const index = require('./_index');

/**
 * Gets value at index (+ve, -ve).
 * @param {Array} x an array
 * @param {number} i index (-ve: from right)
 * @returns {*} value
 */
function get(x, i) {
  return x[index(x, i)];
}
module.exports = get;
