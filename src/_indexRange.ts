import index from './index!';

/**
 * Gets index range of part of array.
 * @param x an array
 * @param i start index (-ve: from right) (0)
 * @param I end index (-ve: from right) (end)
 * @returns [start index, end index]
 */
function indexRange<T>(x: T[], i: number=0, I: number=x.length): [number, number] {
  i = index(x, i);
  I = Math.max(i, index(x, I));
  return [i, I];
}
export default indexRange;
