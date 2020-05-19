import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

function compareCompare<T>(x: T[], y: T[], fn: compareFn<T>=null): number {
  var fn = fn||cmp;
  var X = x.length, Y = y.length;
  for(var i=0, I=Math.min(X, Y); i<I; i++) {
    var c = fn(x[i], y[i]);
    if(c!==0) return c;
  }
  return Math.sign(X-Y);
}

/**
 * Compares two arrays.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x<y: -1, x=y: 0, x>y: 1
 */
function compare<T, U=T>(x: T[], y: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): number {
  var fc = fc||cmp, fm = fm||id;
  var X = x.length, Y = y.length;
  for(var i=0, I=Math.min(X, Y); i<I; i++) {
    var u1 = fm(x[i], i, x);
    var v1 = fm(y[i], i, y);
    var c = fc(u1, v1);
    if(c!==0) return c;
  }
  return Math.sign(X-Y);
}
export default compare;
