/**
 * Generates array from given number range.
 * @param v start number
 * @param V end number, excluding (v)
 * @param s step size (1)
 */
function fromRange(v: number, V: number=v, s: number=1): number[] {
  var a = [];
  if(s>=0) { for(; v<V; v+=s) a.push(v); }
  else { for(; v>V; v+=s) a.push(v); }
  return a;
}
export default fromRange;
