/**
 * Appends values from arrays.
 * @param x an array (updated)
 * @param ys arrays to append
 * @returns x
 */
function concat$<T>(x: T[], ...ys: Iterable<T>[]): T[] {
  for(var y of ys)
    x.push(...y);
  return x;
}
export default concat$;
