import {countAs as iterableCountAs} from 'extra-iterable';
import type {mapFn} from './_types';

/**
 * Counts occurrences of values.
 * @param x an array
 * @param fm map function (v, i, x)
 * @returns Map {value => count}
 */
function countAs<T, U=T>(x: Iterable<T>, fm: mapFn<T, T|U>=null): Map<T|U, number> {
  return iterableCountAs(x, fm);
}
export default countAs;
