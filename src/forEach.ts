import forEach from '@extra-iterable/for-each';
import type {calledFn} from './_types';

/**
 * Calls a function for each value.
 * @param x an array
 * @param fn called function (v, i, x)
 * @param ths this argument
 */
function forEachDeclare<T>(x: Iterable<T>, fn: calledFn<T>, ths: object=null): void {
  forEach(x, fn, ths);
}
export default forEach;
