import isSubsequence from './isSubsequence';
import id from './_id';
import type {mapFn} from './_types';

/**
 * Checks if array has a permutation.
 * @param x an array
 * @param y permutation?
 * @param fn map function (v, i, x)
 * @param ths this argument
 */
function isPermutationOn<T, U>(x: T[], y: T[], fn: mapFn<T, U>=null, ths: object=null): boolean {
  var fn = fn||id;
  var x1 = x.map(fn, ths).sort();
  var y1 = y.map(fn, ths).sort();
  return isSubsequence(x1, y1);
}
export default isPermutationOn;
