import copy$ from './copy$';

/**
 * Copies part of array to another.
 * @param {Array} x target array
 * @param {Array} y source array
 * @param {number?} j write index (0)
 * @param {number?} i read start index (0)
 * @param {number?} I read end index (end)
 * @returns {Array}
 */
function copy<T>(x: T[], y: T[], j: number=0, i: number=0, I: number=y.length): T[] {
  return copy$(x.slice(), y, j, i, I);
}
export default copy;
