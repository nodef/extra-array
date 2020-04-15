/**
 * Lists all possible infixes.
 * @param x an array
 * @param n number of values (-1 => any)
 * @returns ...infixes
 */
function* infixes<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  if(n<=0) { yield []; if(n===0) return; }
  var X = x.length, N = Math.max(n, 1), dj = n<0? 1:X;
  for(var i=0, I=X-N+1; i<I; i++) {
    for(var j=i+N; j<=X; j+=dj)
      yield x.slice(i, j);
  }
}
export default infixes;
