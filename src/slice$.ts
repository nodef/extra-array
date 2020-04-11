import length from './length';

/**
 * Gets a part of array.
 * @param x an array (updated)
 * @param i start index (0)
 * @param I end index (end)
 * @returns x
 */
function slice$<T>(x: T[], i: number=0, I: number=x.length): T[] {
  x.copyWithin(0, i, I);
  x.length = length(x, i, I);
  return x;
}
export default slice$;
