/**
 * Gets zero-based index.
 * @param {Array} x an array
 * @param {number} i index (-ve: from right)
 * @returns {number}
 */
function index(x, i) {
  return i<0? Math.max(x.length+i, 0) : Math.min(i, x.length);
}
module.exports = index;
