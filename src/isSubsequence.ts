import cmp from './_cmp';
import type {compareFn} from './_types';

/**
 * Checks if array has a subsequence.
 * @param x an array
 * @param y subsequence?
 * @param fn compare function (a, b)
 */
function isSubsequence<T>(x: Iterable<T>, y: T[], fn: compareFn<T>=null): boolean {
  if(y.length===0) return true;
  var fn = fn||cmp;
  var j = 0, J = y.length;
  for(var u of x)
    if(fn(u, y[j])===0 && (++j)===J) return true;
  return false;
}
export default isSubsequence;
