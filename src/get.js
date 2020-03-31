const index = require('./index?');

/**
 * Gets value at index.
 * @param {Array} x an array
 * @param {number} i index (-ve: from right)
 * @returns {*}
 */
function get(x, i) {
  return x[index(x, i)];
}
module.exports = get;
