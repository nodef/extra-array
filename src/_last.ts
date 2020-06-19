/**
 * Gets last value.
 * @param x an array
 */
function last<T>(x: T[]): T {
  return x[x.length-1];
}
export default last;
