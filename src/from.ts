/**
 * Converts iterable to array.
 * @param x an iterable
 */
function from<T>(x: Iterable<T>): T[] {
  return Array.from(x);
}
export default from;
