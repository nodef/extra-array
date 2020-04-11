import rotate$ from './rotate$';

/**
 * Rotates values in array.
 * @param x an array
 * @param n rotate amount (-ve: left, +ve: right)
 */
function rotate<T>(x: T[], n: number): T[] {
  return rotate$(x.slice(), n);
}
export default rotate;
