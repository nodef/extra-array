import union$ from './union$';
import type {compareFn} from './_types';

/**
 * Gives values present in any array.
 * @param x an array
 * @param y another array
 * @param fn compare function (a, b)
 */
function union<T>(x: T[], y: Iterable<T>, fn: compareFn<T>=null): T[] {
  return union$(x.slice(), y, fn);
}
export default union;
