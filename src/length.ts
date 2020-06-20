import size from './size'

/**
 * Counts the number of values.
 * @param x an array
 * @param i start index (-ve: from right) (0)
 * @param I end index (-ve: from right) (end)
 */
function length<T>(x: T[], i: number=0, I: number=x.length): number {
  return size(x, i, I);
}
export default length;
