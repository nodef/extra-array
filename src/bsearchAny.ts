import cmp from './_cmp';
import type {compareFn} from './_types';

/**
 * Binary searches value in sorted array.
 * @param {Array} x an array (sorted)
 * @param {*} v search value
 * @param {function?} fn compare function (a, b)
 * @returns {number} index of value | ~(index of closest value)
 */
function bsearchAny<T>(x: T[], v: T, fn: compareFn<T>=null): number {
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
export default bsearchAny;
