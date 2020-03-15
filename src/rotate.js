const rotate$ = require('./rotate$');

/**
 * Rotates values in array.
 * @param {Array} x an array
 * @param {number} n rotate amount (-ve: left, +ve: right)
 * @returns {Array}
 */
function rotate(x, n) {
  return rotate$(x.slice(), n);
}
module.exports = rotate;
