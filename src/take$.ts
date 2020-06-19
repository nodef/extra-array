import slice$ from './slice$';

/**
 * Keeps first n values only.
 * @param x an array (updated)
 * @param n number of values (1)
 * @returns x
 */
function take$<T>(x: T[], n: number=1): T[] {
  return slice$(x, 0, n);
}
export default take$;
