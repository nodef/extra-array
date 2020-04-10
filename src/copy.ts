import copy$ from './copy$';

/**
 * Copies part of array to another.
 * @param x target array
 * @param y source array
 * @param j write index (0)
 * @param i read start index (0)
 * @param I read end index (end)
 */
function copy<T>(x: T[], y: T[], j: number=0, i: number=0, I: number=y.length): T[] {
  return copy$(x.slice(), y, j, i, I);
}
export default copy;
