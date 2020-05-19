/**
 * Generates array from given number range.
 * @param v start number
 * @param s step size (1)
 * @param V end number, excluding (v)
 */
function fromRange(v: number, s: number=1, V: number=v): number[] {
  var a = [];
  for(; v<V; v+=s)
    a.push(v);
  return a;
}
export default fromRange;
