import union$ from './union$';
import type {compareFn} from './_types';

/**
 * Removes duplicate values.
 * @param x an array
 * @param fn compare function (a, b)
 */
function unique<T>(x: Iterable<T>, fn: compareFn<T>=null): T[] {
  return union$([], x, fn);
}
export default unique;
