/**
 * Lists all values.
 * @param x an array
 */
function* values<T>(x: T[]): IterableIterator<T> {
  yield* x;
}
export default values;
