import concat$ from './concat$';

/**
 * Appends arrays to the end.
 * @param x an array
 * @param ys iterables to append
 */
function concat<T>(x: T[], ...ys: Iterable<T>[]): T[] {
  return concat$(x.slice(), ...ys);
}
export default concat;
