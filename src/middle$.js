const slice$ = require('./slice$');

/**
 * Gets values from middle.
 * @param {Array} x an array (updated)
 * @param {number?} i start index (0)
 * @param {number?} n number of values (1)
 * @returns {Array} x
 */
function middle$(x, i=0, n=1) {
  return slice$(x, i, i+n);
}
module.exports = middle$;
