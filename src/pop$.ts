/**
 * Removes last value.
 * @param x an array (updated)
 */
function pop$<T>(x: T[]): T[] {
  x.pop();
  return x;
}
export default pop$;
