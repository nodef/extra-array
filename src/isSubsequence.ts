import searchSubsequence from './searchSubsequence';
import type {compareFn, mapFn} from './_types';

/**
 * Checks if array has a subsequence.
 * @param x an array
 * @param y subsequence?
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function isSubsequence<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  return searchSubsequence(x, y, fc, fm)>=0;
}
export default isSubsequence;
