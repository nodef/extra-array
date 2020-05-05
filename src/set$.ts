import index from './index!';

/**
 * Sets value at index.
 * @param x an array (updated)
 * @param i index (-ve: from right)
 * @param v value
 * @returns x
 */
function set$<T>(x: T[], i: number, v: T): T[] {
  x[index(x, i)] = v;
  return x;
}
export default set$;
