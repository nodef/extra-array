import {hasInfix as iterableHasInfix} from "extra-iterable";
import type {compareFn, mapFn} from "./_types";

/**
 * Checks if array contains an infix.
 * @param x an array
 * @param y infix?
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function hasInfix<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  return iterableHasInfix(x, y, fc, fm);
}
export default hasInfix;
