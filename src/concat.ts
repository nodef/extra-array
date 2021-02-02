import concat$ from "./concat$";

/**
 * Appends values from arrays.
 * @param xs arrays
 */
function concat<T>(...xs: Iterable<T>[]): T[] {
  return concat$([], ...xs);
}
export default concat;
