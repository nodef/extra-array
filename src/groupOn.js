const id = require('./_id');

/**
 * Keeps similar values together and in order.
 * @param {Array} x an array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array<Array>}
 */
function groupOn(x, fn=null, ths=null) {
  var fn = fn||id;
  var a = [], b = [], i = -1;
  var u1 = fn.call(ths, x[0], 0, x);
  for(var v of x) {
    var v1 = fn.call(ths, v, ++i, x);
    if(u1===v1) b.push(v);
    else { a.push(b); b = [v]; }
    u1 = v1;
  }
  a.push(b);
  return a;
}
module.exports = groupOn;
