/**
 * Gets values from the left.
 * @param x an array
 * @param n number of values (1)
 */
function left<T>(x: T[], n: number=1): T[] {
  return x.slice(0, n);
}
export default left;
