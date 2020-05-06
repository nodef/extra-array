/**
 * Gives index-value pairs.
 * @param x an array
 */
function* entries<T>(x: Iterable<T>): IterableIterator<[number, T]> {
  var i = -1;
  for(var v of x)
    yield [++i, v];
}
export default entries;
