const id = require('./_id');

/**
 * Compares two arrays.
 * @param {Array} x an array
 * @param {Array} y another array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {number} x<y: -1, x=y: 0, x>y: 1
 */
function compare(x, y, fn=null, ths=null) {
  var fn = fn||id;
  var n = x.length - y.length;
  if(n!==0) return n<0? -1:1;
  for(var i=0, I=x.length; i<I; i++) {
    var u1 = fn.call(ths, x[i], i, x);
    var v1 = fn.call(ths, y[i], i, y);
    var c = u1-v1;
    if(c!==0) return c;
  }
  return 0;
}
module.exports = compare;
