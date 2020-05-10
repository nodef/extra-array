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
  var X = x.length, Y = y.length;
  for(var i=0, I=Math.min(X, Y); i<I; i++) {
    var c = fn(x[i], y[i]);
    if(c!==0) return c;
  }
  return Math.sign(X-Y);
}
export default compare;
