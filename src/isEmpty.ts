/**
 * Checks is array is empty.
 * @param x an array
 */
function isEmpty<T>(x: T[]): boolean {
  return x.length===0;
}
export default isEmpty;
