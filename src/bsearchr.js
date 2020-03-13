const cmp = require('./_cmp');

/**
 * Binary searches rightmost value in sorted array.
 * @param {Array} x an array (sorted)
 * @param {*} v value to find
 * @param {function?} fn compare function (a, b)
 * @returns {number} last index of value | ~(index of closest value)
 */
function bsearchr(x, v, fn) {
  fn = fn||cmp;
  for(var i=0, I=x.length; i<I;) {
    var m = (i+I)>>>1;
    var c = fn(x[m], v);
    if(c<=0) i = m+1;
    else I = m;
  }
  return i<=0 || fn(x[i-1], v)!==0? ~i:i-1;
}
module.exports = bsearchr;
