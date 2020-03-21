/**
 * Gets absolute index within array.
 * @param {Array} x an array
 * @param {number} i index (+ve/-ve)
 * @returns {number} index
 */
function index(x, i) {
  return i<0? x.length+i:i;
}
module.exports = index;
