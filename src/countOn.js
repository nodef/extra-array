const id = require('./_id');

/**
 * Counts occurrences of a value.
 * @param {Array} x an array
 * @param {*} v value
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {number} occurrences
 */
function countOn(x, v, fn=null, ths=null) {
  var fn = fn||id, i = -1, n = 0;
  var v1 = fn.call(ths, v, 0, null);
  for(var u of x) {
    var u1 = fn.call(ths, u, ++i, x);
    if(u1===v1) n++;
  }
  return n;
}
module.exports = countOn;
