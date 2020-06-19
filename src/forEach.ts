import type {calledFn} from './_types';

/**
 * Calls a function for each value.
 * @param x an array
 * @param fc called function (v, i, x)
 */
function forEach<T>(x: T[], fc: calledFn<T>): void {
  x.forEach(fc);
}
export default forEach;
