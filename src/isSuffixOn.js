const id = require('./_id');

/**
 * Checks if array ends with a suffix.
 * @param {Array} x an array
 * @param {Array} y suffix?
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean}
 */
function isSuffixOn(x, y, fn=null, ths=null) {
  var fn = fn||id, i = x.length-y.length-1, j = -1;
  for(var v of y) {
    var u1 = fn.call(ths, x[++i], i, x);
    var v1 = fn.call(ths, v, ++j, y);
    if(u1!==v1) return false;
  }
  return true;
}
module.exports = isSuffixOn;
