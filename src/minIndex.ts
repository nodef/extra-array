import minIndex from '@extra-iterable/min-index';
import type {compareFn, mapFn} from './_types';

/**
 * Finds index of smallest value.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function minIndexDeclare<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): number {
  return minIndex(x, fc, fm);
}
export default minIndex;
