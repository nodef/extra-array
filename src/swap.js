const swap$ = require('./swap$');

/**
 * Exchanges two values.
 * @param {Array} x an array
 * @param {number} i an index
 * @param {number} j another index
 * @returns {Array}
 */
function swap(x, i, j) {
  return swap$(x.slice(), i, j);
}
module.exports = swap;
