import iterableCountOn from '@extra-iterable/count-on';
import type {mapFn} from './_types';

/**
 * Counts occurrences of values.
 * @param x an array
 * @param fn map function (v, i, x)
 * @param ths this argument
 * @returns Map {value => count}
 */
function countOn<T, U>(x: Iterable<T>, fn: mapFn<T, U>=null, ths: object=null): Map<T|U, number> {
  return iterableCountOn(x, fn, ths);
}
export default countOn;
