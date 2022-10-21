/**
 * Gets zero-based index.
 * @param x an array
 * @param i index (-ve: from right) (0)
 */
function index<T>(x: T[], i: number=0): number {
  return i<0? Math.max(x.length+i, 0) : Math.min(i, x.length);
}
export default index;
