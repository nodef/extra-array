import slice$ from './slice$';

/**
 * Discards first n values only.
 * @param x an array (updated)
 * @param n number of values (1)
 * @returns x
 */
function drop$<T>(x: T[], n: number=1): T[] {
  return slice$(x, n);
}
export default drop$;
