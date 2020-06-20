import isSubsequence from './isSubsequence';
import type {compareFn, mapFn} from './_types';

/**
 * Checks if array has a permutation.
 * @param x an array
 * @param y permutation?
 * @param fc map function (v, i, x)
 * @param fm compare function (a, b)
 */
function isPermutation<T, U=T>(x: T[], y: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  var x1 = fm? x.map(fm) : x.slice();
  var y1 = fm? y.map(fm) : y.slice();
  return isSubsequence(x1.sort(), y1.sort(), fc, fm);
}
export default isPermutation;
