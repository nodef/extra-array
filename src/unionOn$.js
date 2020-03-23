const uniques = require('./_uniques');
const id = require('./_id');

/**
 * Gives union of an array with another.
 * @param {Array} x an array (updated)
 * @param {Iterable} y another array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} x
 */
function unionOn$(x, y, fn=null, ths=null) {
  var s = uniques(x, fn, ths);
  var fn = fn||id, i = -1;
  for(var v of y) {
    var v1 = fn.call(ths, v, ++i, y);
    if(!s.has(v1)) { x.push(v); s.add(v1); }
  }
  return x;
}
module.exports = unionOn$;
