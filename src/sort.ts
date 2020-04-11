import sort$ from './sort$';
import type {compareFn} from './_types';

/**
 * Arranges values in an order.
 * @param x an array
 * @param fn compare function (a, b)
 */
function sort<T>(x: T[], fn: compareFn<T>=null): T[] {
  return sort$(x.slice(), fn);
}
export default sort;
