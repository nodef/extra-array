import {keys as iterableKeys} from 'extra-iterable';

/**
 * Lists all indices.
 * @param x an array
 */
function* keys<T>(x: Iterable<T>): IterableIterator<number> {
  yield* iterableKeys(x);
}
export default keys;
