import {max as iterableMax} from 'extra-iterable';
import {compareFn, mapFn} from './_types';

/**
 * Finds largest value.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function max<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T {
  return iterableMax(x, fc, fm);
}
export default max;
