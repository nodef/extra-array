import search from '@extra-iterable/search';
import type {compareFn, mapFn} from './_types';

/**
 * Searches a value from left.
 * @param x an array
 * @param v search value
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns index of value, -1 if not found
 */
function searchDeclare<T, U=T>(x: T[], v: T, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): number {
  return search(x, v, fc, fm);
}
export default search;
