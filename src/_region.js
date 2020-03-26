const index = require('./_index');

/**
 * Gives absolute indices within array.
 * @param {Array} x an array
 * @param {number} i start index +ve/-ve (0)
 * @param {number} I end index +ve/-ve (end)
 * @returns {number} [start index, end index]
 */
function region(x, i=0, I=x.length) {
  i = index(x, i);
  I = Math.max(i, index(x, I));
  return [i, I];
}
module.exports = region;
