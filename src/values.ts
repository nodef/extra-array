import {values as iterableValues} from 'extra-iterable';

/**
 * Lists all values.
 * @param x an array
 */
function* values<T>(x: Iterable<T>): IterableIterator<T> {
  yield* iterableValues(x);
}
export default values;
