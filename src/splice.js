const concat$ = require('./concat$');

/**
 * Removes or replaces existing values.
 * @param {Array} x an array
 * @param {number} i remove index
 * @param {number?} n no. of values to remove
 * @param {...any} vs values to insert
 * @returns {Array<Array>} [removed, updated]
 */
function splice(x, i, n=x.length-i, ...vs) {
  var r = x.slice(i, i+n);
  var u = concat$(x.slice(0, i), vs, x.slice(i+n));
  return [r, u];
}
module.exports = splice;
