/**
 * Gets values from middle.
 * @param x an array
 * @param i start index (0)
 * @param n number of values (1)
 */
function middle<T>(x: T[], i: number=0, n: number=1): T[] {
  return x.slice(i, i+n);
}
export default middle;
