const id = require('./_id');

/**
 * Finds largest value.
 * @param {Array} x an array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {*} maximum
 */
function maximumOn(x, fn=null, ths=null) {
  var fn = fn||id, i = -1;
  var mk = fn.call(ths, x[0], 0, x), mv = x[0];
  for(var v of x) {
    var k = fn.call(ths, v, ++i, x);
    if(k>mk) { mk = k; mv = v; }
  }
  return mv;
}
module.exports = maximumOn;
