import max from '@extra-iterable/max';
import {compareFn, mapFn} from './_types';

/**
 * Finds largest value.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function maxDeclare<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T {
  return max(x, fc, fm);
}
export default max;
