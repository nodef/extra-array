/**
 * Copies part of array within.
 * @param {Array} x an array
 * @param {number} j write index
 * @param {number?} i read start index
 * @param {number?} I read end index
 * @returns {Array}
 */
function copyWithin(x, j, i=0, I=x.length) {
  var a = x.slice(0, j);
  for(var J=Math.min(j+I-i, I); j<J; j++, i++)
    a[j] = x[i];
  for(var J=x.length; j<J; j++)
    a[j] = x[j];
  return a;
}
module.exports = copyWithin;
