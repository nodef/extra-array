import maxIndex from '@extra-iterable/max-index';
import type {compareFn, mapFn} from './_types';

/**
 * Finds index of largest value.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function maxIndexDeclare<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): number {
  return maxIndex(x, fc, fm);
}
export default maxIndex;
