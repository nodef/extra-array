import compare from './compare';
import type {compareFn, mapFn} from './_types';

/**
 * Checks if two arrays are equal.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function isEqual<T, U=T>(x: T[], y: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  var X = x.length, Y = y.length;
  return X===Y && compare(x, y, fc, fm)===0;
}
export default isEqual;
