const indexRange = require('./indexRange');

/**
 * Gets length of part of array.
 * @param {Array} x an array
 * @param {number} i start index (-ve: from right) (0)
 * @param {number} I end index (-ve: from right) (0)
 */
function length(x, i=0, I=x.length) {
  var [i, I] = indexRange(x, i, I);
  return I-i;
}
module.exports = length;
