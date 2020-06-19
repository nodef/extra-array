import insertionSort$ from './insertionSort$';
import type {compareFn, mapFn} from './_types';

/**
 * Arranges values in an order.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function insertionSort<T, U=T>(x: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  return insertionSort$(x.slice(), fc, fm);
}
export default insertionSort;
