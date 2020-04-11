import id from './_id';
import type {mapFn} from './_types';

/**
 * Finds smallest and largest values.
 * @param x an array
 * @param fn map function (v, i, x)
 * @param ths this argument
 * @returns [min, max]
 */
function rangeOn<T, U>(x: Iterable<T>, fn: mapFn<T, U>=null, ths: object=null): [T, T] {
  var fn = fn||id, i = -1;
  var mk = fn.call(ths, x[0], 0, x), mv = x[0];
  var nk = mk, nv = mv;
  for(var v of x) {
    var k = fn.call(ths, v, ++i, x);
    if(k<mk) { mk = k; mv = v; }
    if(k>nk) { nk = k; nv = v; }
  }
  return [mv, nv];
}
export default rangeOn;
