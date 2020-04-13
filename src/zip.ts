import id from './_id';
import type {mapFn} from './_types';

/**
 * Combines values from n arrays.
 * @param xs n arrays
 * @param fn map function ([...vs], i, x)
 * @param ths this argument
 */
function zip<T, U>(xs: T[][], fn: mapFn<T[], U>=null, ths: object=null): U[] {
  var fn = fn||id;
  var a = [], A = 0;
  for(var r=0, R=xs.length; r<R; r++)
    A = Math.max(A, xs[r].length);
  for(var c=0; c<A; c++) {
    for(var r=0, w=[]; r<R; r++)
      w[r] = xs[r][c];
    a[c] = fn.call(ths, w, c, xs);
  }
  return a;
}
export default zip;
