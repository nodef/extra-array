const index = require('./index?');

/**
 * Gets index range of part of array.
 * @param {Array} x an array
 * @param {number} i start index (-ve: from right) (0)
 * @param {number} I end index (-ve: from right) (end)
 * @returns {number} [start index, end index]
 */
function indexRange(x, i=0, I=x.length) {
  i = index(x, i);
  I = Math.max(i, index(x, I));
  return [i, I];
}
module.exports = indexRange;
