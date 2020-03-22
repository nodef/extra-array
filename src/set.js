const index = require('./_index');
const splice = require('./splice');

/**
 * Sets value at index.
 * @param {Array} x an array
 * @param {number} i index (-ve: from right)
 * @param {*} v value
 * @returns {Array}
 */
function set(x, i, v) {
  return splice(x, index(x, i), 1, v)[1];
}
module.exports = set;
