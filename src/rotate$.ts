import copy$ from './copy$';
import mod from '@extra-math/mod';

/**
 * Rotates values in array.
 * @param x an array (updated)
 * @param n rotate amount (-ve: left, +ve: right)
 * @returns x
 */
function rotate$<T>(x: T[], n: number): T[] {
  var n = mod(n, x.length);
  var y = x.slice(-n);
  x.copyWithin(n, 0);
  return copy$(x, y);
}
export default rotate$;
