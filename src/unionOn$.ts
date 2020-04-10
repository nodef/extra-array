import uniques from './_uniques';
import id from './_id';
import type {mapFn} from './_types';

/**
 * Gives values present in any array.
 * @param x an array (updated)
 * @param y another array
 * @param fn map function (v, i, x)
 * @param ths this argument
 * @returns x
 */
function unionOn$<T, U>(x: T[], y: Iterable<T>, fn: mapFn<T, U>=null, ths: object=null): T[] {
  var s = uniques(x, fn, ths);
  var fn = fn||id, i = -1;
  for(var v of y) {
    var v1 = fn.call(ths, v, ++i, y);
    if(!s.has(v1)) { x.push(v); s.add(v1); }
  }
  return x;
}
export default unionOn$;
