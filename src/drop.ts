/**
 * Discards first n values only.
 * @param x an array
 * @param n number of values (1)
 */
function drop<T>(x: T[], n: number=1): T[] {
  return x.slice(n);
}
export default drop;
