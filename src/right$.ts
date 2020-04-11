import slice$ from './slice$';

/**
 * Gets values from the right.
 * @param x an array (updated)
 * @param n number of values (1)
 * @returns x
 */
function right$<T>(x: T[], n: number=1): T[] {
  return slice$(x, x.length-n);
}
export default right$;
