/**
 * Keeps only the selected region.
 * @param {Array} x an array (updated)
 * @param {number} i start index
 * @param {number} I end index
 * @returns {Array} x
 */
function slice$(x, i=0, I=x.length) {
  x.copyWithin(0, i, I);
  x.length = I-i;
  return x;
}
module.exports = slice$;
