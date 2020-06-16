import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

/**
 * Binary searches leftmost value in sorted array.
 * @param x an array (sorted)
 * @param v search value
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns first index of value | ~(index of closest value)
 */
function bsearch<T, U=T>(x: T[], v: T, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): number {
  var fc = fc||cmp, fm = fm||id;
  var v1 = fm(v, 0, null);
  for(var i=0, I=x.length; i<I;) {
    var m  = i+I >>> 1;
    var u1 = fm(x[m], m, x);
    var c  = fc(u1, v1);
    if(c<0) i = m+1;
    else    I = m;
  }
  return i>=x.length || fc(fm(x[i], i, x), v1)!==0? ~i:i;
}
export default bsearch;
