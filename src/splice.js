const concat$ = require('./concat$');

/**
 * Removes or replaces existing values.
 * @param {Array} x an array
 * @param {number} i remove index
 * @param {number?} n number of values to remove (rest)
 * @param {...any} vs values to insert
 * @returns {Array<Array>} [removed, array]
 */
function splice(x, i, n=x.length-i, ...vs) {
  var r = x.slice(i, i+n);
  var u = concat$(x.slice(0, i), vs, x.slice(i+n));
  return [r, u];
}
module.exports = splice;
