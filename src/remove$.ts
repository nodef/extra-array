/**
 * Removes value at index.
 * @param x an array (updated)
 * @param i index
 * @returns x
 */
function remove$<T>(x: T[], i: number): T[] {
  x.splice(i, 1);
  return x;
}
export default remove$;
