import isSubsequence from './isSubsequence';
import cmp from './_cmp';
import type {compareFn} from './_types';

/**
 * Checks if array has a permutation.
 * @param x an array
 * @param y permutation?
 * @param fn compare function (a, b)
 */
function isPermutation<T>(x: T[], y: T[], fn: compareFn<T>=null): boolean {
  var fn = fn||cmp;
  var x1 = x.slice().sort(fn);
  var y1 = y.slice().sort(fn);
  return isSubsequence(x1, y1, fn);
}
export default isPermutation;
