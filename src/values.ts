/**
 * Lists all values.
 * @param x an array
 * @returns ...values
 */
function* values<T>(x: Iterable<T>): IterableIterator<T> {
  yield* x;
}
export default values;
