/**
 * Picks an arbitrary key.
 * @param x an array
 * @param r random seed 0->1
 */
function key<T>(x: T[], r: number=Math.random()): number {
  return Math.floor(r * x.length);
}
export default key;
