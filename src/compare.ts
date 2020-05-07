import cmp from './_cmp';
import type {compareFn} from './_types';

/**
 * Compares two arrays.
 * @param x an array
 * @param y another array
 * @param fn compare function (a, b)
 * @returns x<y: -1, x=y: 0, x>y: 1
 */
function compare<T>(x: T[], y: T[], fn: compareFn<T>=null): number {
  var fn = fn||cmp;
  var n = x.length - y.length;
  if(n!==0) return Math.sign(n);
  for(var i=0, I=x.length; i<I; i++) {
    var c = fn(x[i], y[i]);
    if(c!==0) return c;
  }
  return 0;
}
export default compare;
