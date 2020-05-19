/**
 * Extracts given number of values from array.
 * @param x an array
 * @param n number of values (1)
 */
function take<T>(x: T[], n: number=1): T[] {
  return x.slice(0, n);
}
export default take;
