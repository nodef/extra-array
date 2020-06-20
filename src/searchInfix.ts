import {searchInfix as iterableSearchInfix} from 'extra-iterable';
import type {compareFn, mapFn} from './_types';

/**
 * Finds first index of an infix.
 * @param x an array
 * @param y search infix
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function searchInfix<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): number {
  return iterableSearchInfix(x, y, fc, fm);
}
export default searchInfix;
