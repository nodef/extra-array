import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

function insertionSortPair$<T, U=T>(x: T[], fc: compareFn<T|U>, m: (T|U)[]): T[] {
  var X = x.length, diff = x!==m;
  for(var i=X-2; i>=0; i--) {
    var xv = x[i], mv = m[i];
    for(var j=i+1; j<X; j++) {
      if(fc(mv, m[j]) <= 0) break;
      if(true) x[j-1] = x[j];
      if(diff) m[j-1] = m[j];
    }
    if(true) x[j-1] = xv;
    if(diff) m[j-1] = mv;
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
function insertionSort$<T, U=T>(x: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  var fc = fc||cmp;
  if(fm) return insertionSortPair$(x, fc, x.map(fm));
  else return insertionSortPair$(x, fc, x);
}
export default insertionSort$;
