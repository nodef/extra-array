/**
 * Gets values from the right.
 * @param x an array
 * @param n number of values (1)
 */
function right<T>(x: T[], n: number=1): T[] {
  return x.slice(x.length-n);
}
export default right;
