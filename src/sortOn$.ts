import cmp from './_cmp';
import type {mapFn} from './_types';

/**
 * Arranges values in an order.
 * @param x an array (updated)
 * @param fn map function (v, i, x)
 * @param ths this argument
 * @returns x
 */
function sortOn$<T, U>(x: T[], fn: mapFn<T, U>=null, ths: object=null): T[] {
  if(!fn) return x.sort(cmp);
  var m = new Map(), i = -1;
  for(var v of x)
    m.set(v, fn.call(ths, v, ++i, x));
  return x.sort((a, b) => cmp(m.get(a), m.get(b)));
}
export default sortOn$;
