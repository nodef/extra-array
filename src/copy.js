const copy$ = require('./copy$');

/**
 * Copies part of array to another.
 * @param {Array} x target array
 * @param {Array} y source array
 * @param {number?} j write index (0)
 * @param {number?} i read start index (0)
 * @param {number?} I read end index (x.length)
 * @returns {Array}
 */
function copy(x, y, j=0, i=0, I=y.length) {
  return copy$(x.slice(), y, j, i, I);
}
module.exports = copy;
