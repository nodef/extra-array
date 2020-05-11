/**
 * Removes last value.
 * @param x an array
 */
function pop<T>(x: T[]): T[] {
  return x.slice(0, -1);
}
export default pop;
