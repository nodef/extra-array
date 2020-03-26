/**
 * Gets a part of array.
 * @param {Array} x an array
 * @param {number} i start index (0)
 * @param {number} I end index (end)
 * @returns {Array}
 */
function slice(x, i=0, I=x.length) {
  return x.slice(i, I);
}
module.exports = slice;
