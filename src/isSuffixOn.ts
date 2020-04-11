import id from './_id';
import type {mapFn} from './_types';

/**
 * Checks if array ends with a suffix.
 * @param x an array
 * @param y suffix?
 * @param fn map function (v, i, x)
 * @param ths this argument
 */
function isSuffixOn<T, U>(x: T[], y: T[], fn: mapFn<T, U>=null, ths: object=null): boolean {
  var fn = fn||id, i = x.length-y.length-1, j = -1;
  for(var v of y) {
    var u1 = fn.call(ths, x[++i], i, x);
    var v1 = fn.call(ths, v, ++j, y);
    if(u1!==v1) return false;
  }
  return true;
}
export default isSuffixOn;
