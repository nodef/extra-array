import iterableRange from '@extra-iterable/range';
import type {compareFn, mapFn} from './_types';

/**
 * Finds smallest and largest values.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns [min, max]
 */
function range<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): [T, T] {
  return iterableRange(x, fc, fm);
}
export default range;
