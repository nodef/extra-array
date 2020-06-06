import type {Lists} from './_types';

/**
 * Gives lists of keys, and values.
 * @param x an array
 */
function lists<T>(x: T[]): Lists<T> {
  return [x.keys(), x.values()];
}
export default lists;
