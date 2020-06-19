import indexRange from './indexRange';

/**
 * Gets size of part of array.
 * @param x an array
 * @param i start index (-ve: from right) (0)
 * @param I end index (-ve: from right) (end)
 */
function size<T>(x: T[], i: number=0, I: number=x.length): number {
  var [i, I] = indexRange(x, i, I);
  return I-i;
}
export default size;
