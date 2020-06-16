import {forEach as iterableForEach} from 'extra-iterable';
import type {calledFn} from './_types';

/**
 * Calls a function for each value.
 * @param x an array
 * @param fn called function (v, i, x)
 */
function forEach<T>(x: Iterable<T>, fn: calledFn<T>): void {
  iterableForEach(x, fn);
}
export default forEach;
