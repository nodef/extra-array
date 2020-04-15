/**
 * Lists all possible suffixes.
 * @param x an array
 * @param n number of values (-1 => any)
 * @returns ...suffixes
 */
function* suffixes<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  if(n>=0) { yield x.slice(x.length-n); return; }
  for(var i=0, I=x.length; i<=I; i++)
    yield x.slice(i);
}
export default suffixes;
