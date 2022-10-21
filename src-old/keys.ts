/**
 * Lists all indices.
 * @param x an array
 */
function keys<T>(x: T[]): IterableIterator<number> {
  return x.keys();
}
export default keys;
