const index = require('./_index');

/**
 * Sets value at index.
 * @param {Array} x an array (updated)
 * @param {number} i index (-ve: from right)
 * @param {*} v value
 * @returns {Array} x
 */
function set$(x, i, v) {
  x[index(x, i)] = v;
  return x;
}
module.exports = set$;
