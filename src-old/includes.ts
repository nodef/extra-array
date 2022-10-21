/**
 * Checks if array has a value.
 * @param x an array
 * @param v search value
 * @param i start index (0)
 */
function includes<T>(x: T[], v: T, i: number=0): boolean {
  return x.includes(v, i);
}
export default includes;
