const length = require('./length');

/**
 * Gets a part of array.
 * @param {Array} x an array (updated)
 * @param {number} i start index (0)
 * @param {number} I end index (end)
 * @returns {Array} x
 */
function slice$(x, i=0, I=x.length) {
  x.copyWithin(0, i, I);
  x.length = length(x, i, I);
  return x;
}
module.exports = slice$;
