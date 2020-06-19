/**
 * Reverses the values.
 * @param x an array
 */
function reverse<T>(x: T[]): T[] {
  return x.slice().reverse();
}
export default reverse;
