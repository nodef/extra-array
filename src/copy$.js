const index = require('./index?');
const indexRange = require('./indexRange');

/**
 * Copies part of array to another.
 * @param {Array} x target array (updated)
 * @param {Array} y source array
 * @param {number?} j write index (0)
 * @param {number?} i read start index (0)
 * @param {number?} I read end index (end)
 * @returns {Array} x
 */
function copy$(x, y, j=0, i=0, I=y.length) {
  var j = index(x, j);
  var [i, I] = indexRange(y, i, I);
  for(; i<I; i++, j++)
    x[j] = y[i];
  return x;
}
module.exports = copy$;
