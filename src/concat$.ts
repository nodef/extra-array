/**
 * Appends arrays to the end.
 * @param x an array (updated)
 * @param ys iterables to append
 * @returns x
 */
function concat$<T>(x: T[], ...ys: Iterable<T>[]): T[] {
  for(var y of ys) {
    if(Array.isArray(y)) Array.prototype.push.apply(x, y);
    else for(var v of y) x.push(v);
  }
  return x;
}
export default concat$;
