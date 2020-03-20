/**
 * Keeps the values which pass the test.
 * @param {Array} x an array (updated)
 * @param {function} fn test function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} x
 */
function filter$(x, fn, ths=null) {
  for(var i=0, j=0, I=x.length; i<I; i++)
    if(fn.call(ths, x[i], i, x)) x[j++] = x[i];
  x.length = j;
  return x;
}
module.exports = filter$;
