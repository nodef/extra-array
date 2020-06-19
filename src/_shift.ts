/**
 * Removes first value.
 * @param x an array
 */
function shift<T>(x: T[]): T[] {
  return x.slice(1);
}
export default shift;
