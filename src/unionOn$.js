/**
 * Gives union of first array with another.
 * @param {Array} x an array (updated)
 * @param {Array} y another array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} x
 */
function unionOn$(x, y, fn, ths=null) {
  var s = new Set();
  var i = -1, j = -1;
  for(var u of x) {
    var u1 = fn.call(ths, u, ++i, x);
    s.add(u1);
  }
  for(var v of y) {
    var v1 = fn.call(ths, v, ++j, y);
    if(!s.has(v1)) x.push(v);
  }
  return x;
}
module.exports = unionOn$;
