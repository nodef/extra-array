import indexRange from './indexRange';

/**
 * Counts the number of values.
 * @param x an array
 * @param i start index (-ve: from right) (0)
 * @param I end index (-ve: from right) (X)
 */
function size<T>(x: T[], i: number=0, I: number=x.length): number {
  var [i, I] = indexRange(x, i, I);
  return I-i;
}
export default size;
