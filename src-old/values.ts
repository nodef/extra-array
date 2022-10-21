/**
 * Lists all values.
 * @param x an array
 */
function values<T>(x: T[]): IterableIterator<T> {
  return x.values();
}
export default values;
