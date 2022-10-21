import copy$ from "./copy$";

/**
 * Moves part of array within.
 * @param x an array (updated)
 * @param j write index (0)
 * @param i read start index (0)
 * @param I read end index (X)
 * @returns x
 */
function moveWithin$<T>(x: T[], j: number=0, i: number=0, I: number=x.length): T[] {
  var p = x.slice(i, I), P = p.length;
  if(j<i) x.copyWithin(j+P, j, i);
  else x.copyWithin(i, I, j);
  return copy$(x, p, j<i? j : j-P);
}
export default moveWithin$;
