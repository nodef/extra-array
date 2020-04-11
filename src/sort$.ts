import cmp from './_cmp';
import type {compareFn} from './_types';

/**
 * Arranges values in an order.
 * @param x an array (updated)
 * @param fn compare function (a, b)
 * @returns x
 */
function sort$<T>(x: T[], fn: compareFn<T>=null): T[] {
  return x.sort(fn||cmp);
}
export default sort$;
