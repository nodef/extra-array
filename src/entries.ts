import type {Entries} from './_types';

/**
 * Lists all index-value pairs.
 * @param x an array
 */
function entries<T>(x: T[]): Entries<T> {
  return x.entries();
}
export default entries;
