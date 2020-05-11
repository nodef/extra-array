import uniques from './_uniques';
import id from './_id';
import type {mapFn} from './_types';

/**
 * Gives values of array not present in another.
 * @param x an array
 * @param y another array
 * @param fn map function (v, i, x)
 * @param ths this argument
 */
function differenceOn<T, U>(x: Iterable<T>, y: Iterable<T>, fn: mapFn<T, U>=null, ths: object=null): T[] {
  var fn = fn||id;
  var s = uniques(y, fn, ths);
  var a = [], i = -1;
  for(var u of x) {
    var u1 = fn.call(ths, u, ++i, x);
    if(!s.has(u1)) a.push(u);
  }
  return a;
}
export default differenceOn;
