import concat$ from './concat$';

/**
 * Adds values to the start.
 * @param x an array
 * @param vs values to add
 * @returns array
 */
function unshift<T>(x: Iterable<T>, ...vs: T[]): T[] {
  return concat$(vs, x);
}
export default unshift;
