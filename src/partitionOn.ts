import id from './_id';
import type {mapFn} from './_types';

/**
 * Segregates array keeping similar values together.
 * @param {Iterable} x an array
 * @param {function} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Map<any, Array>} {key => values}
 */
function partitionOn<T, U>(x: Iterable<T>, fn: mapFn<T, U>=null, ths: object=null): Map<U, T[]> {
  var fn = fn||id;
  var m = new Map(), i = -1;
  for(var v of x) {
    var v1 = fn.call(ths, v, ++i, x);
    if(!m.has(v1)) m.set(v1, []);
    m.get(v1).push(v);
  }
  return m;
}
export default partitionOn;
