import splice from './splice';

function* permutationsOf<T>(x: T[], n: number): IterableIterator<T[]> {
  if(x.length===0 || n===0) { yield []; return; }
  for(var i=x.length-1; i>=0; i--) {
    var y = splice(x, i, 1)[1];
    for(var p of permutationsOf(y, n-1)) {
      p.push(x[i]);
      yield p;
    }
  }
}

/**
 * Lists all possible permutations.
 * @param x an array
 * @param n number of values (-1 => any)
 * @returns ...permutations
 */
function* permutations<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  if(n>x.length) return;
  for(var i=n<0? 0:n, I=n<0? x.length:n; i<=I; i++)
    yield* permutationsOf(x, i);
}
export default permutations;
