import slice$ from './slice$';

/**
 * Gets values from the left.
 * @param x an array (updated)
 * @param n number of values (1)
 * @returns x
 */
function left$<T>(x: T[], n: number=1): T[] {
  return slice$(x, 0, n);
}
export default left$;
