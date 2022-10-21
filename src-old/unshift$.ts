/**
 * Adds values to the start.
 * @param x an array (updated)
 * @param vs values to add
 * @returns x
 */
function unshift$<T>(x: T[], ...vs: T[]): T[] {
  x.unshift(...vs);
  return x;
}
export default unshift$;
