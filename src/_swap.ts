import swap$ from './swap$';

/**
 * Exchanges two values.
 * @param x an array
 * @param i an index
 * @param j another index
 */
function swap<T>(x: T[], i: number, j: number): T[] {
  return swap$(x.slice(), i, j);
}
export default swap;
