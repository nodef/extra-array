/**
 * Copies part of array within.
 * @param {Array} x an array (updated)
 * @param {number} j write index
 * @param {number?} i read start index (0)
 * @param {number?} I read end index (x.length)
 * @returns {Array} x
 */
function copyWithin$(x, j, i=0, I=x.length) {
  return x.copyWithin(j, i, I);
}
module.exports = copyWithin$;
