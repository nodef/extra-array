import iterableEntries from '@extra-iterable/entries';

/**
 * Lists all index-value pairs.
 * @param x an array
 */
function* entries<T>(x: Iterable<T>): IterableIterator<[number, T]> {
  yield* iterableEntries(x);
}
export default entries;
