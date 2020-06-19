/**
 * Discards last n values only.
 * @param x an array
 * @param n number of values (1)
 */
function dropRight<T>(x: T[], n: number=1): T[] {
  return x.slice(0, x.length-n);
}
export default dropRight;
