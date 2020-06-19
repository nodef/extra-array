import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

/**
 * Checks if array has a subsequence.
 * @param x an array
 * @param y subsequence?
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function isSubsequence<T, U=T>(x: Iterable<T>, y: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  var fc = fc||cmp, fm = fm||id
  var i = -1, j = 0, J = y.length;
  var y1 = y.map(fm);
  for(var u of x) {
    var u1 = fm(u, ++i, x);
    if(fc(u1, y1[j])!==0) continue;
    if(++j>=J) return true;
  }
  return false;
}
export default isSubsequence;
