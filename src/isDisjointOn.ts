import iterableIsDisjointOn from '@extra-iterable/is-disjoint-on';
import type {mapFn} from './_types';

/**
 * Checks if arrays have no value in common.
 * @param x an array
 * @param y another array
 * @param fn map function (v, i, x)
 * @param ths this argument
 */
function isDisjointOn<T, U>(x: Iterable<T>, y: Iterable<T>, fn: mapFn<T, U>=null, ths: object=null): boolean {
  return iterableIsDisjointOn(x, y, fn, ths);
}
export default isDisjointOn;
