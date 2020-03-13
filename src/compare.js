const cmp = require('./_cmp');

/**
 * Compares two arrays.
 * @param {Array} x an array
 * @param {Array} y another array
 * @param {function?} fn compare function (a, b)
 * @returns {number} x<y: -1, x=y: 0, x>y: 1
 */
function compare(x, y, fn) {
  fn = fn||cmp;
  var n = x.length - y.length;
  if(n!==0) return n<0? -1:1;
  for(var i=0, I=x.length; i<I; i++) {
    var c = fn(x[i], y[i]);
    if(c!==0) return c;
  }
  return 0;
}
module.exports = compare;
