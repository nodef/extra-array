/**
 * Lists all possible values.
 * @param x an array
 * @returns ...values
 */
function* values<T>(x: T[]): IterableIterator<T> {
  for(var v of x)
    yield v;
}
export default values;
