const id = require('./_id');

/**
 * Checks if arrays have no value in common.
 * @param {Array} x an array
 * @param {Array} y another array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean} true if disjoint
 */
function isDisjointOn(x, y, fn, ths=null) {
  fn = fn||id;
  var s = new Set();
  var i = -1, j = -1;
  for(var u of x) {
    var u1 = fn.call(ths, u, ++i, x);
    s.add(u1);
  }
  for(var v of y) {
    var v1 = fn.call(ths, v, ++j, y);
    if(s.has(v1)) return false;
  }
  return true;
}
module.exports = isDisjointOn;
