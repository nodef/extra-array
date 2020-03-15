const index = require('./_index');

/**
 * Exchanges two values.
 * @param {Array} x an array (updated)
 * @param {number} i an index
 * @param {number} j another index
 * @returns {Array} x
 */
function swap$(x, i, j) {
  var i = index(x, i);
  var j = index(x, j);
  var t = x[i];
  x[i] = x[j];
  x[j] = t;
  return x;
}
module.exports = swap$;
