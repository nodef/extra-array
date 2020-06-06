import iterableEntries from '@extra-iterable/entries';
import type {Entries} from './_types';

/**
 * Lists all index-value pairs.
 * @param x an array
 */
function* entries<T>(x: Iterable<T>): Entries<T> {
  yield* iterableEntries(x);
}
export default entries;
