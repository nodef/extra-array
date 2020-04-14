/**
 * Lists all possible values.
 * @param x an array
 * @returns ...values
 */
function* values<T>(x: T[]): Iterable<T> {
  yield* x.values();
}
export default values;
