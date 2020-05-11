import id from './_id';
import type {mapFn} from './_types';

/**
 * Combines values from arrays.
 * @param xs arrays
 * @param vd default value
 * @param fn map function (vs, i, xs)
 * @param ths this argument
 */
function zipLongest<T, U>(xs: T[][], vd: T, fn: mapFn<T[], U>=null, ths: object=null): U[] {
  var fn = fn||id;
  var R = xs.length, a = [];
  var C = Math.max(...xs.map(x => x.length));
  for(var c=0; c<C; c++) {
    for(var r=0, vs=[]; r<R; r++)
      vs.push(xs[r][c] || vd);
    a.push(fn.call(ths, vs, c, xs));
  }
  return a;
}
export default zipLongest;
