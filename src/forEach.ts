import {forEach as iterableForEach} from 'extra-iterable';
import type {calledFn} from './_types';

/**
 * Calls a function for each value.
 * @param x an array
 * @param fc called function (v, i, x)
 */
function forEach<T>(x: Iterable<T>, fc: calledFn<T>): void {
  iterableForEach(x, fc);
}
export default forEach;
