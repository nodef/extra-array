/**
 * Removes or replaces existing values.
 * @param x an array (updated)
 * @param i remove index
 * @param n number of values to remove (rest)
 * @param vs values to insert
 */
function splice$<T>(x: T[], i: number, n: number=x.length-i, ...vs: T[]): T[] {
  x.splice(i, n, ...vs);
  return x;
}
export default splice$;
