const slice$ = require('./slice$');

/**
 * Gets values from the right.
 * @param {Array} x an array (updated)
 * @param {number?} n number of values (1)
 * @returns {Array} x
 */
function right$(x, n=1) {
  return slice$(x, x.length-n);
}
module.exports = right$;
