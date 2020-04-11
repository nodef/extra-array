import args from './_args';
import type {combineFn} from './_types';

/**
 * Combines values from n arrays, with a function.
 * @param xs n arrays
 * @param fn combine function (a, b, c, ...)
 * @param ths this argument
 * @returns combined values
 */
function zip<T, U>(xs: T[][], fn: combineFn=null, ths: object=null): U[] {
  var fn = fn||args;
  var a = [], A = 0;
  for(var r=0, R=xs.length; r<R; r++)
    A = Math.max(A, xs[r].length);
  for(var c=0; c<A; c++) {
    for(var r=0, w=[]; r<R; r++)
      w[r] = xs[r][c];
    a[c] = fn.apply(ths, w);
  }
  return a;
}
export default zip;
