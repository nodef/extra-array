/**
 * Gets element at index (+ve / -ve).
 * @param {Array} x source
 * @param {number} i index (-ve => from right)
 * @returns {*} element
 */
function get(x, i) {
  return i<0? x[x.length-i]:x[i];
}
