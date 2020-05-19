/**
 * Drops given number of values from array.
 * @param x an array
 * @param n number of values
 */
function drop<T>(x: T[], n: number=0): T[] {
  return x.slice(n);
}
export default drop;
