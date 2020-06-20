import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

function selectionSortPair$<T, U=T>(x: T[], fc: compareFn<T|U>, m: (T|U)[]): T[] {
  var X = x.length, diff = x!==m;
  for(var i=0; i<X-1; i++) {
    var l = i;
    for(var j=i+1; j<X; j++)
      if(fc(m[l], m[j]) > 0) l = j;
    if(true) { var t = x[i]; x[i] = x[l]; x[l] = t; }
    if(diff) { var u = m[i]; m[i] = m[l]; m[l] = u; }
  }
  return x;
}

/**
 * Arranges values in an order.
 * @param x an array (updated)
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x
 */
function selectionSort$<T, U=T>(x: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  var fc = fc||cmp;
  if(fm) return selectionSortPair$(x, fc, x.map(fm));
  else return selectionSortPair$(x, fc, x);
}
export default selectionSort$;
