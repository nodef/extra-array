import iterableIsDisjoint from '@extra-iterable/is-disjoint';
import type {compareFn} from './_types';

/**
 * Checks if arrays have no value in common.
 * @param x an array
 * @param y another array
 * @param fn compare function (a, b)
 */
function isDisjoint<T>(x: Iterable<T>, y: Iterable<T>, fn: compareFn<T>=null): boolean {
  return iterableIsDisjoint(x, y, fn);
}
export default isDisjoint;
