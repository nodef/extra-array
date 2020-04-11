import set$ from './set$';

/**
 * Sets value at index.
 * @param x an array
 * @param i index (-ve: from right)
 * @param v value
 */
function set<T>(x: T[], i: number, v: T): T[] {
  return set$(x.slice(), i, v);
}
export default set;
