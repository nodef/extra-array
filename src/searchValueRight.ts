import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

/**
 * Finds from right, index of a value.
 * @param x an array
 * @param v search value
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns index of value, -1 if not found
 */
function searchValueRight<T, U=T>(x: T[], v: T, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): number {
  var fc = fc||cmp, fm = fm||id;
  var v1 = fm(v, 0, null);
  for(var i=x.length-1; i>=0; i--) {
    var u1 = fm(x[i], i, x);
    if(fc(u1, v1)===0) return i;
  }
  return -1;
}
export default searchValueRight;
