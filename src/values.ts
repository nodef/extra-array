import values from '@extra-iterable/values';

/**
 * Lists all values.
 * @param x an array
 */
function* valuesDeclare<T>(x: Iterable<T>): IterableIterator<T> {
  yield* values(x);
}
export default values;
