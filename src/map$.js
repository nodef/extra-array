/**
 * Updates values based on map function.
 * @param {Array} x an array (updated)
 * @param {function} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} x
 */
function map$(x, fn, ths=null) {
  for(var i=0, I=x.length; i<I; i++)
    x[i] = fn.call(ths, x[i], i, x);
  return x;
}
module.exports = map$;
