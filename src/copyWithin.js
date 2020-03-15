/**
 * Copies part of array within.
 * @param {Array} x an array
 * @param {number} j write index
 * @param {number?} i read start index (0)
 * @param {number?} I read end index (x.length)
 * @returns {Array}
 */
function copyWithin(x, j, i=0, I=x.length) {
  var a = x.slice(0, j)
  var num = Math.min(I-i, x.length-i);
  for(var J=Math.min(j+num, x.length); j<J; j++, i++)
    a[j] = x[i];
  for(var J=x.length; j<J; j++)
    a[j] = x[j];
  return a;
}
module.exports = copyWithin;
