import entries from '@extra-iterable/entries';

/**
 * Lists all index-value pairs.
 * @param x an array
 */
function* entriesDeclare<T>(x: Iterable<T>): IterableIterator<[number, T]> {
  yield* entries(x);
}
export default entries;
