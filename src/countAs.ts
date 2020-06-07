import {countAs as iterableCountAs} from 'extra-iterable';
import type {mapFn} from './_types';

/**
 * Counts occurrences of values.
 * @param x an array
 * @param fn map function (v, i, x)
 * @param ths this argument
 * @returns Map {value => count}
 */
function countAs<T, U=T>(x: Iterable<T>, fn: mapFn<T, T|U>=null, ths: object=null): Map<T|U, number> {
  return iterableCountAs(x, fn, ths);
}
export default countAs;
