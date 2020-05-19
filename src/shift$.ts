/**
 * Removes first value.
 * @param x an array (updated)
 */
function shift$<T>(x: T[]): T[] {
  x.shift();
  return x;
}
export default shift$;
