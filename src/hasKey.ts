/**
 * Checks if array has a key.
 * @param x an array
 * @param k key?
 */
function hasKey<T>(x: T[], k: number=0): boolean {
  var X = x.length;
  return k>=-X && k<X;
}
export default hasKey;
