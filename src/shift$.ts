/**
 * Removes first value.
 * @param x an array (updated)
 * @returns x
 */
function shift$<T>(x: T[]): T[] {
  x.shift();
  return x;
}
export default shift$;
