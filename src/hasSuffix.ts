import compare from './compare';
import type {compareFn, mapFn} from './_types';

/**
 * Checks if array ends with a suffix.
 * @param x an array
 * @param y suffix?
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function hasSuffix<T, U=T>(x: T[], y: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  var Y = y.length;
  return Y===0 || compare(x.slice(-Y), y, fc, fm)===0;
}
export default hasSuffix;
