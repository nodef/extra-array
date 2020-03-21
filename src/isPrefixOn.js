const id = require('./_id');

/**
 * Checks if array starts with a prefix.
 * @param {Array} x an array
 * @param {Array} y prefix?
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean}
 */
function isPrefixOn(x, y, fn=null, ths=null) {
  var fn = fn||id, i = -1;
  for(var v of y) {
    var u1 = fn.call(ths, x[++i], i, x);
    var v1 = fn.call(ths, v, i, y);
    if(u1!==v1) return false;
  }
  return true;
}
module.exports = isPrefixOn;
