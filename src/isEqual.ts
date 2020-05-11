import compare from './compare';
import type {compareFn} from './_types';

/**
 * Checks if two arrays are equal.
 * @param x an array
 * @param y another array
 * @param fn compare function (a, b)
 */
function isEqual<T>(x: T[], y: T[], fn: compareFn<T>=null): boolean {
  var X = x.length, Y = y.length;
  return X===Y && compare(x, y, fn)===0;
}
export default isEqual;
