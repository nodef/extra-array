/**
 * Converts iterable to array.
 * @param x an iterable (updatable if array)
 */
function from$<T>(x: Iterable<T>): T[] {
  return Array.isArray(x)? x : [...x];
}
export default from$;
