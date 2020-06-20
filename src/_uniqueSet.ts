import type {mapFn} from './_types';

/**
 * Gets unique set of values.
 * @param x an iterable
 * @param fm map function (v, i, x)
 */
function uniqueSet<T, U=T>(x: Iterable<T>, fm: mapFn<T, T|U>=null): Set<T|U> {
  if(!fm) return new Set(x);
  var s = new Set<T|U>(), i = -1;
  for(var v of x)
    s.add(fm(v, ++i, x));
  return s;
} 
export default uniqueSet;
