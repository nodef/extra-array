import {searchInfixAll as iterableSearchInfixAll} from 'extra-iterable';
import type {compareFn, mapFn} from './_types';

/**
 * Finds indices of an infix.
 * @param x an array
 * @param y search infix
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function searchInfixAll<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): number[] {
  return [...iterableSearchInfixAll(x, y, fc, fm)];
}
export default searchInfixAll;
