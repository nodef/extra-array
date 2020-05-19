import isUnique from '@extra-iterable/is-unique';
import type {compareFn, mapFn} from './_types';


/**
 * Checks if there are no duplicate values.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function isUniqueDeclare<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  return isUnique(x, fc, fm);
}
export default isUnique;
