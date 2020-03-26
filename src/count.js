/**
 * Counts values which satisfy a test.
 * @param {Iterable} x an array
 * @param {function} fn test function (v, i, x)
 * @param {object?} ths this argument
 * @returns {number}
 */
function count(x, fn, ths=null) {
  var n = 0, i = -1;
  for(var v of x)
    if(fn.call(ths, v, ++i, x)) n++;
  return n;
}
module.exports = count;
