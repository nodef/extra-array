const id = require('./_id');

/**
 * Finds smallest and largest values.
 * @param {Array} x an array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} [min, max]
 */
function rangeOn(x, fn=null, ths=null) {
  var fn = fn||id, i = -1;
  var mk = fn.call(ths, x[0], 0, x), mv = x[0];
  var nk = mk, nv = mv;
  for(var v of x) {
    var k = fn.call(ths, v, ++i, x);
    if(k<mk) { mk = k; mv = v; }
    if(k>nk) { nk = k; nv = v; }
  }
  return [mv, nv];
}
module.exports = rangeOn;
