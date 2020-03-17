const copy$ = require('./copy$');
const modp = require('./_modp');

/**
 * Rotates values in array.
 * @param {Array} x an array (updated)
 * @param {number} n rotate amount (-ve: left, +ve: right)
 * @returns {Array} x
 */
function rotate$(x, n) {
  var n = modp(n, x.length);
  var y = x.slice(-n);
  x.copyWithin(n, 0);
  return copy$(x, y);
}
module.exports = rotate$;
