import concat$ from './concat$';

/**
 * Appends arrays together.
 * @param xs arrays to append
 */
function concat<T>(...xs: Iterable<T>[]): T[] {
  return concat$([], ...xs);
}
export default concat;
