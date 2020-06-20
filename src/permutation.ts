import permutation$ from './permutation$';

/**
 * Picks an arbitrary permutation.
 * @param x an array
 * @param n number of values (-1 => any)
 * @param r random seed 0->1
 */
function permutation<T>(x: T[], n: number=-1, r: number=Math.random()): T[] {
  if(n>x.length) return null;
  return permutation$(x.slice(), n, r);
}
export default permutation;
