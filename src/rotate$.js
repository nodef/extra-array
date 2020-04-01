const copy$ = require('./copy$');
const mod = require('@extra-math/mod');

/**
 * Rotates values in array.
 * @param {Array} x an array (updated)
 * @param {number} n rotate amount (-ve: left, +ve: right)
 * @returns {Array} x
 */
function rotate$(x, n) {
  var n = mod(n, x.length);
  var y = x.slice(-n);
  x.copyWithin(n, 0);
  return copy$(x, y);
}
module.exports = rotate$;
