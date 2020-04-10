import cmp from './_cmp';
import type {compareFn} from './_types';

/**
 * Binary searches leftmost value in sorted array.
 * @param x an array (sorted)
 * @param v search value
 * @param fn compare function (a, b)
 * @returns first index of value | ~(index of closest value)
 */
function bsearch<T>(x: T[], v: T, fn: compareFn<T>=null): number {
  fn = fn||cmp;
  for(var i=0, I=x.length; i<I;) {
    var m = (i+I)>>>1;
    var c = fn(x[m], v);
    if(c<0) i = m+1;
    else I = m;
  }
  return i>=x.length || fn(x[i], v)!==0? ~i:i;
}
export default bsearch;
