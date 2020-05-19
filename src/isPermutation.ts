import id from './_id';
import cmp from './_cmp';
import isSubsequence from './isSubsequence';
import type {compareFn, mapFn} from './_types';

function isPermutationCompare<T>(x: T[], y: T[], fn: compareFn<T>=null): boolean {
  var fn = fn||cmp;
  var x1 = x.slice().sort(fn);
  var y1 = y.slice().sort(fn);
  return isSubsequence(x1, y1, fn);
}

function isPermutationMap<T, U=T>(x: T[], y: T[], fn: mapFn<T, T|U>=null): boolean {
  var fn = fn||id;
  var x1 = x.map(fn).sort();
  var y1 = y.map(fn).sort();
  return isSubsequence(x1, y1);
}

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
