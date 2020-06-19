import range from './range';
import type {compareFn, mapFn} from './_types';

/**
 * Finds smallest value.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns [index, value]
 */
function min<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): [number, T] {
  return range(x, fc, fm)[0];
}
export default min;
