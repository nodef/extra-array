/**
 * Copies part of array within.
 * @param x an array (updated)
 * @param j write index
 * @param i read start index (0)
 * @param I read end index (end)
 * @returns x
 */
function copyWithin$<T>(x: T[], j: number, i: number=0, I: number=x.length): T[] {
  return x.copyWithin(j, i, I);
}
export default copyWithin$;
