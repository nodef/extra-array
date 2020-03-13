const cmp = require('./_cmp');

/**
 * Binary search value in sorted array.
 * @param {Array} x an array (sorted)
 * @param {*} v value to find
 * @param {function?} fn compare function (a, b)
 * @returns {number} index of value | ~(index of closest value)
 */
function bsearch(x, v, fn) {
  fn = fn||cmp;
  for(var i=0, I=x.length; i<I;) {
    var m = (i+I)>>>1;
    var c = fn(x[m], v);
    if(c<0) i = m+1;
    else if(c>0) I = m;
    else return m;
  }
  return ~i;
}
module.exports = bsearch;
