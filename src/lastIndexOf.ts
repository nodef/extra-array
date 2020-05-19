/**
 * Finds last index of a value.
 * @param x an array
 * @param v search value
 * @param i start index
 */
function lastIndexOf<T>(x: T[], v: T, i: number=x.length-1) {
  return x.lastIndexOf(v, i);
}
export default lastIndexOf;
