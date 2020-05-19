import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

function sortCompare$<T>(x: T[], fn: compareFn<T>=null): T[] {
  return x.sort(fn||cmp);
}

function sortMap$<T, U=T>(x: T[], fn: mapFn<T, T|U>=null): T[] {
  if(!fn) return x.sort(cmp);
  var m = new Map(), i = -1;
  for(var v of x)
    m.set(v, fn(v, ++i, x));
  return x.sort((a, b) => cmp(m.get(a), m.get(b)));
}

/**
 * Arranges values in an order.
 * @param x an array (updated)
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x
 */
function sort$<T, U=T>(x: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  var fc = fc||cmp;
  if(!fm) return x.sort(fc);
  var m = new Map(), i = -1;
  for(var v of x)
    m.set(v, fm(v, ++i, x));
  return x.sort((a, b) => fc(m.get(a), m.get(b)));
}
export default sort$;
