/**
 * Adds values to the end. 
 * @param x an array (updated)
 * @param vs values to add
 * @returns x
 */
function push$<T>(x: T[], ...vs: T[]): T[] {
  Array.prototype.push.apply(x, vs);
  return x;
}
export default push$;
