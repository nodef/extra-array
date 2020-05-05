import index from './index!';
import indexRange from './indexRange';

/**
 * Copies part of array to another.
 * @param x target array (updated)
 * @param y source array
 * @param j write index (0)
 * @param i read start index (0)
 * @param I read end index (end)
 * @returns x
 */
function copy$<T>(x: T[], y: T[], j: number=0, i: number=0, I: number=y.length): T[] {
  var j = index(x, j);
  var [i, I] = indexRange(y, i, I);
  for(; i<I; i++, j++)
    x[j] = y[i];
  return x;
}
export default copy$;
