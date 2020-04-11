import random from './_random';

/**
 * Picks an arbitrary permutation.
 * @param x an array (updated)
 * @param n number of values (-1 => any)
 * @param r random seed 0->1
 * @returns x
 */
function permutation$<T>(x: T[], n: number=-1, r: number=Math.random()): T[] {
  if(n>x.length) return x;
  var X = x.length, rnd = random(r);
  var n = n>=0? n:Math.floor((X+1)*rnd());
  for(var i=0; i<n; i++) {
    var j = i+Math.floor((X-i)*rnd());
    var t = x[i]; x[i] = x[j]; x[j] = t;
  }
  x.length = n;
  return x;
}
export default permutation$;
