import type {mapFn} from './_types';

/**
 * Gets unique set of values.
 * @param x an iterable
 * @param fn map function (v, i, x)
 * @param ths this argument
 */
function uniques<T, U>(x: Iterable<T>, fn: mapFn<T, U>=null, ths: object=null): Set<T|U> {
  if(!fn) return new Set(x);
  var s = new Set<U>(), i = -1;
  for(var v of x)
    s.add(fn.call(ths, v, ++i, x));
  return s;
} 
export default uniques;
