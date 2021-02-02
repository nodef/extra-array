import {searchInfixRight as iterableSearchInfixRight} from "extra-iterable";
import type {compareFn, mapFn} from "./_types";

/**
 * Finds last index of an infix.
 * @param x an array
 * @param y search infix
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function searchInfixRight<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): number {
  return iterableSearchInfixRight(x, y, fc, fm);
}
export default searchInfixRight;
