/**
 * Extracts values of array, from right.
 * @param x an array
 * @param n number of values (1)
 */
function takeRight<T>(x: T[], n: number=1): T[] {
  return n>0? x.slice(-n) : [];
}
export default takeRight;
