import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

function bubbleSortPair$<T, U=T>(x: T[], fc: compareFn<T|U>, m: (T|U)[]): T[] {
  var X = x.length, diff = x!==m;
  for(var i=0; i<X-1; i++) {
    for(var j=i+1; j<X; j++) {
      if(fc(m[i], m[j]) <= 0) continue;
      if(true) { var t = x[i]; x[i] = x[j]; x[j] = t; }
      if(diff) { var u = m[i]; m[i] = m[j]; m[j] = u; }
    }
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
function bubbleSort$<T, U=T>(x: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  var fc = fc||cmp;
  if(fm) return bubbleSortPair$(x, fc, x.map(fm));
  else return bubbleSortPair$(x, fc, x);
}
export default bubbleSort$;
