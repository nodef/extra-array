/**
 * Adds values to the end. 
 * @param x an array
 * @param vs values to add
 * @returns array
 */
function push<T>(x: T[], ...vs: T[]): T[] {
  return x.concat(vs);
}
export default push;
