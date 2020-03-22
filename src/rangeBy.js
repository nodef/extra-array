const cmp = require('./_cmp');

/**
 * Finds smallest and largest values.
 * @param {Array} x an array
 * @param {function?} fn compare function (a, b)
 * @returns {Array} [min, max]
 */
function rangeBy(x, fn=null) {
  var fn = fn||cmp, m = x[0], n = m;
  for(var v of x) {
    if(fn(v, m)<0) m = v;
    if(fn(v, n)>0) n = v;
  }
  return [m, n];
}
module.exports = rangeBy;
