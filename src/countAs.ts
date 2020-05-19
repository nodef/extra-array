import countAs from '@extra-iterable/count-as';
import type {mapFn} from './_types';

/**
 * Counts occurrences of values.
 * @param x an array
 * @param fn map function (v, i, x)
 * @param ths this argument
 * @returns Map {value => count}
 */
function countAsDeclare<T, U=T>(x: Iterable<T>, fn: mapFn<T, T|U>=null, ths: object=null): Map<T|U, number> {
  return countAs(x, fn, ths);
}
export default countAs;
