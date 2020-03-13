const index = require('./_index');
const splice = require('./splice');

/**
 * Sets value at index (+ve, -ve).
 * @param {Array} x an array
 * @param {number} i index (-ve: from right)
 * @param {*} v value
 * @returns {Array} set array
 */
function set(x, i, v) {
  return splice(x, index(x, i), 1, v);
}
module.exports = set;
