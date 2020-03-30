const slice$ = require('./slice$');

/**
 * Gets values from the left.
 * @param {Array} x an array (updated)
 * @param {number?} n number of values (1)
 * @returns {Array} x
 */
function left$(x, n=1) {
  return slice$(x, 0, n);
}
module.exports = left$;
