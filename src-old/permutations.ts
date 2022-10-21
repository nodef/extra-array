import splice from "./splice";

function* permutationsOf<T>(x: T[], n: number): IterableIterator<T[]> {
  var X = x.length;
  if(X===0 || n===0) { yield []; return; }
  for(var i=0; i<X; i++) {
    var y = splice(x, i, 1);
    for(var p of permutationsOf(y, n-1))
      yield [x[i], ...p];
  }
}

/**
 * Lists all possible permutations.
 * @param x an array
 * @param n number of values (-1 => any)
 */
function* permutations<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  var X = x.length;
  if(n>X) return;
  for(var i=n<0? 0:n, I=n<0? X:n; i<=I; i++)
    yield* permutationsOf(x, i);
}
export default permutations;
