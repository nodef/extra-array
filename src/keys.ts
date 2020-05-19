import keys from '@extra-iterable/keys';

/**
 * Lists all indices.
 * @param x an array
 */
function* keysDeclare<T>(x: Iterable<T>): IterableIterator<number> {
  yield* keys(x);
}
export default keys;
