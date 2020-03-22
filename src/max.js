const cmp = require('./_cmp');

/**
 * Finds largest value.
 * @param {Array} x an array
 * @param {function?} fn compare function (a, b)
 * @returns {*}
 */
function max(x, fn=null) {
  var fn = fn||cmp, m = x[0];
  for(var v of x)
    if(fn(v, m)>0) m = v;
  return m;
}
module.exports = max;
