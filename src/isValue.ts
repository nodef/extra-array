import search from './search';
import type {compareFn, mapFn} from './_types';

/**
 * Checks if array has a value.
 * @param x an array
 * @param v value?
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function isValue<T, U=T>(x: T[], v: T, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  return search(x, v, fc, fm) >= 0;
}
export default isValue;
