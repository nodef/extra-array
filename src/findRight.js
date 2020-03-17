/**
 * Finds index of rightmost value passing the test.
 * @param {Array} x an array
 * @param {function} fn test function (v, i, x)
 * @param {object?} ths this argument
 * @returns {number} index of value, -1 if not found
 */
function findRight(x, fn, ths=null) {
  for(var i=x.length-1; i>=0; i--)
    if(fn.call(ths, x[i], i, x)) return i;
  return -1;
}
module.exports = findRight;
