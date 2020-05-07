/**
 * Lists all possible values.
 * @param x an array
 * @returns ...values
 */
function* values<T>(x: Iterable<T>): IterableIterator<T> {
  for(var v of x)
    yield v;
}
export default values;
