/**
 * Gets a part of array.
 * @param x an array
 * @param i start index (0)
 * @param I end index (end)
 */
function slice<T>(x: T[], i: number=0, I: number=x.length): T[] {
  return x.slice(i, I);
}
export default slice;
