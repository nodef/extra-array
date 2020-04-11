import uniques from './_uniques';
import id from './_id';
import type {mapFn} from './_types';

/**
 * Checks if arrays have no value in common.
 * @param x an array
 * @param y another array
 * @param fn map function (v, i, x)
 * @param ths this argument
 */
function isDisjointOn<T, U>(x: Iterable<T>, y: Iterable<T>, fn: mapFn<T, U>=null, ths: object=null): boolean {
  var s = uniques(x, fn, ths);
  var fn = fn||id, i = -1;
  for(var v of y) {
    var v1 = fn.call(ths, v, ++i, y);
    if(s.has(v1)) return false;
  }
  return true;
}
export default isDisjointOn;
