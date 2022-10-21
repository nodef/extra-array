/**
 * Gets values except last.
 * @param x an array
 */
function init<T>(x: T[]): T[] {
  return x.slice(0, -1);
}
export default init;
