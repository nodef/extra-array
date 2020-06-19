/**
 * Adds values to the end. 
 * @param x an array (updated)
 * @param vs values to add
 * @returns x
 */
function push$<T>(x: T[], ...vs: T[]): T[] {
  x.push(...vs);
  return x;
}
export default push$;
