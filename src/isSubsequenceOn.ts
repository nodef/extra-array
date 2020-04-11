import id from './_id';
import type {mapFn} from './_types';

/**
 * Checks if array has a subsequence.
 * @param x an array
 * @param y subsequence?
 * @param fn map function (v, i, x)
 * @param ths this argument
 */
function isSubsequenceOn<T, U>(x: Iterable<T>, y: T[], fn: mapFn<T, U>=null, ths: object=null): boolean {
  var fn = fn||id, i = -1;
  var j = 0, J = y.length;
  var y1 = y.map(fn, ths);
  for(var u of x) {
    var u1 = fn.call(ths, u, ++i, x);
    if(u1===y1[j] && (++j)===J) return true;
  }
  return false;
}
export default isSubsequenceOn;
