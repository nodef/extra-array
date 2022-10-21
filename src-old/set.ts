import set$ from "./set$";

/**
 * Sets value at index.
 * @param x an array
 * @param i index
 * @param v value
 */
function set<T>(x: T[], i: number, v: T): T[] {
  return set$(x.slice(), i, v);
}
export default set;
