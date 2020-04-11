import slice$ from './slice$';

/**
 * Gets values from middle.
 * @param x an array (updated)
 * @param i start index (0)
 * @param n number of values (1)
 * @returns x
 */
function middle$<T>(x: T[], i: number=0, n: number=1): T[] {
  return slice$(x, i, i+n);
}
export default middle$;
