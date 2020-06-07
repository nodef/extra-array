import {isDisjoint as iterableIsDisjoint} from 'extra-iterable';
import type {compareFn, mapFn} from './_types';

/**
 * Checks if arrays have no value in common.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function isDisjoint<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  return iterableIsDisjoint(x, y, fc, fm);
}
export default isDisjoint;
