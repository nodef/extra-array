/**
 * Removes or replaces existing values.
 * @param x an array (updated)
 * @param i remove index
 * @param n number of values to remove (rest)
 * @param vs values to insert
 * @returns removed
 */
function splice$<T>(x: T[], i: number, n: number=x.length-i, ...vs: T[]): T[] {
  return x.splice(i, n, ...vs);
}
export default splice$;
