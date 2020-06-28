import compare from './compare';
import type {compareFn, mapFn} from './_types';

/**
 * Checks if array starts with a prefix.
 * @param x an array
 * @param y prefix?
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function hasPrefix<T, U=T>(x: T[], y: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  var Y = y.length;
  return Y===0 || compare(x.slice(0, Y), y, fc, fm)===0;
}
export default hasPrefix;
