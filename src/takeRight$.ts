import slice$ from './slice$';

/**
 * Keeps last n values only.
 * @param x an array (updated)
 * @param n number of values (1)
 * @returns x
 */
function takeRight$<T>(x: T[], n: number=1): T[] {
  return slice$(x, x.length-n);
}
export default takeRight$;
