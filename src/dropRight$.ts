import slice$ from './slice$';

/**
 * Discards last n values only.
 * @param x an array (updated)
 * @param n number of values (1)
 * @returns x
 */
function dropRight$<T>(x: T[], n: number=1): T[] {
  return slice$(x, 0, x.length-n);
}
export default dropRight$;
