import id from './_id';
import type {mapFn} from './_types';

/**
 * Finds largest value.
 * @param x an array
 * @param fn map function (v, i, x)
 * @param ths this argument
 */
function maxOn<T, U>(x: Iterable<T>, fn: mapFn<T, U>=null, ths: object=null): T {
  var fn = fn||id, i = -1;
  var mk = fn.call(ths, x[0], 0, x), mv = x[0];
  for(var v of x) {
    var k = fn.call(ths, v, ++i, x);
    if(k>mk) { mk = k; mv = v; }
  }
  return mv;
}
export default maxOn;
