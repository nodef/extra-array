import search from './search';
import type {compareFn} from './_types';

/**
 * Checks if array has a value.
 * @param x an array
 * @param v value?
 * @param fn compare function (a, b)
 */
function isValue<T>(x: T[], v: T, fn: compareFn<T>=null): boolean {
  return search(x, v, fn) >= 0;
}
export default isValue;
