/**
 * Keeps last n values only.
 * @param x an array
 * @param n number of values (1)
 */
function takeRight<T>(x: T[], n: number=1): T[] {
  return x.slice(x.length-n);
}
export default takeRight;
