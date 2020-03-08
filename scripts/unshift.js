const concat$ = require('./concat$');

/**
 * Adds values to the start.
 * @param {Array} x an array
 * @param {...any} vs values to add
 * @returns {Array} unshifted
 */
function unshift(x, ...vs) {
  return concat$(vs, x);
}
module.exports = unshift;
