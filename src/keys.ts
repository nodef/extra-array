/**
 * Gives indices.
 * @param x an array
 */
function* keys<T>(x: Iterable<T>): IterableIterator<number> {
  var i = -1;
  for(var _ of x)
    yield ++i;
}
export default keys;
