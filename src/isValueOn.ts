import id from './_id';
import type {mapFn} from './_types';

/**
 * Checks if array has a value.
 * @param x an array
 * @param v value?
 * @param fn map function (v, i, x)
 * @param ths this argument
 */
function isValueOn<T, U>(x: T[], v: T, fn: mapFn<T, U>=null, ths: object=null): boolean {
  var fn = fn||id, i = -1;
  var v1 = fn.call(ths, v, 0, null);
  for(var u of x) {
    var u1 = fn.call(ths, u, ++i, x);
    if(u1===v1) return true;
  }
  return false;
}
export default isValueOn;
