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
function searchSubsequence<T, U=T>(x: Iterable<T>, y: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): number {
  var fc = fc||cmp, fm = fm||id
  var J = y.length, a = -1;
  var i = -1, j = 0;
  var y1 = y.map(fm);
  for(var u of x) {
    var u1 = fm(u, ++i, x);
    if(fc(u1, y1[j])!==0) continue;
    if(a<0) a = i;
    if(++j>=J) return a;
  }
  return -1;
}
export default searchSubsequence;
