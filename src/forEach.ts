import {forEach as iterableForEach} from 'extra-iterable';
import type {calledFn} from './_types';

/**
 * Calls a function for each value.
 * @param x an array
 * @param fn called function (v, i, x)
 * @param ths this argument
 */
function forEach<T>(x: Iterable<T>, fn: calledFn<T>, ths: object=null): void {
  iterableForEach(x, fn, ths);
}
export default forEach;
