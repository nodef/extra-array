import cmp from "./_cmp";
import type {compareFn, mapFn} from "./_types";
import id from "./_id";

function sortDual$<T, U=T>(x: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  var fc = fc||cmp, fm = fm||id;
  var m = new Map(), i = -1;
  for(var v of x)
    m.set(v, fm(v, ++i, x));
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
  if(fm) return sortDual$(x, fc, fm);
  else return x.sort(fc);
}
export default sort$;
