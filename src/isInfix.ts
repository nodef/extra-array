import iterableIsInfix from '@extra-iterable/is-infix';
import type {compareFn, mapFn} from './_types';

/**
 * Checks if array contains an infix.
 * @param x an array
 * @param y infix?
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function isInfix<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  return iterableIsInfix(x, y, fc, fm);
}
export default isInfix;
