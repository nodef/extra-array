/**
 * Gets values except first.
 * @param x an array
 */
function tail<T>(x: T[]): T[] {
  return x.slice(1);
}
export default tail;
