import index from './index!';

/**
 * Exchanges two values.
 * @param x an array (updated)
 * @param i an index
 * @param j another index
 * @returns x
 */
function swap$<T>(x: T[], i: number, j: number): T[] {
  var i = index(x, i), j = index(x, j);
  var t = x[i]; x[i] = x[j]; x[j] = t;
  return x;
}
export default swap$;
