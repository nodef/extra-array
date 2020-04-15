/**
 * Lists all possible subsequences.
 * @param x an array
 * @param n number of values (-1 => any)
 * @returns ...subsequences
 */
function* subsequences<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  var X = x.length;
  if(n>=X) { if(n===X) yield x; return; }
  if(n===0 || X===0) { yield []; return; }
  var y = x.slice(0, -1);
  yield* subsequences(y, n);
  for(var s of subsequences(y, n-1)) {
    s.push(x[X-1]);
    yield s;
  }
}
export default subsequences;
