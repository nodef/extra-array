const index = require('./_index');

/**
 * Gives absolute indices within array.
 * @param {Array} x an array
 * @param {number} i start index (+ve/-ve)
 * @param {number} I end index (+ve/-ve)
 * @returns {number} [start index, end index]
 */
function region(x, i, I) {
  return [
    Math.max(index(x, i), 0),
    Math.min(index(x, I), x.length)
  ];
}
module.exports = region;
