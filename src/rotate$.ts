import mod from '@extra-math/mod';
import copy$ from './copy$';

/**
 * Rotates values in array.
 * @param x an array (updated)
 * @param n rotate amount (+ve: left, -ve: right)
 * @returns x
 */
function rotate$<T>(x: T[], n: number=0): T[] {
  var n = mod(n, x.length);
  var y = x.slice(0, n);
  x.copyWithin(0, n);
  return copy$(x, y, x.length-n);
}
export default rotate$;
