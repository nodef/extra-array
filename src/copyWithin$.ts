/**
 * Copies part of array within.
 * @param x an array (updated)
 * @param j write index (0)
 * @param i read start index (0)
 * @param I read end index (X)
 * @returns x
 */
function copyWithin$<T>(x: T[], j: number=0, i: number=0, I: number=x.length): T[] {
  return x.copyWithin(j, i, I);
}
export default copyWithin$;
