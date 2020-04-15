/**
 * Lists all possible prefixes.
 * @param x an array
 * @param n number of values (-1 => any)
 * @returns ...prefixes
 */
function* prefixes<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  if(n>=0) { yield x.slice(0, n); return; }
  for(var i=0, I=x.length; i<=I; i++)
    yield x.slice(0, i);
}
export default prefixes;
