/**
 * Finds first index of a value.
 * @param x an array
 * @param v search value
 * @param i start index
 */
function indexOf<T>(x: T[], v: T, i: number=0): number {
  return x.indexOf(v, i);
}
export default indexOf;
