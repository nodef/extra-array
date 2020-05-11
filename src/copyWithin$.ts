import indexRange from './indexRange';

/**
 * Copies part of array within.
 * @param x an array (updated)
 * @param j write index (0)
 * @param i read start index (0)
 * @param I read end index (end)
 * @returns x
 */
function copyWithin$<T>(x: T[], j: number=0, i: number=0, I: number=x.length): T[] {
  var [i, I] = indexRange(x, i, I);
  var [j, J] = indexRange(x, j, j+I-i);
  for(; j<J; j++, i++)
    x[j] = x[i];
  return x;
}
export default copyWithin$;
