import uniques from './_uniques';
import id from './_id';
import type {mapFn} from './_types';

/**
 * Gives values present in both arrays.
 * @param x an array
 * @param y another array
 * @param fn map function (v, i, x)
 * @param ths this argument
 */
function intersectionOn<T, U>(x: Iterable<T>, y: Iterable<T>, fn: mapFn<T, U>=null, ths: object=null): T[] {
  var s = uniques(y, fn, ths);
  var fn = fn||id, i = -1, a = [];
  for(var u of x) {
    var u1 = fn.call(ths, u, ++i, x);
    if(s.has(u1)) a.push(u);
  }
  return a;
}
export default intersectionOn;
