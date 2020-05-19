/**
 * Merges values from arrays.
 * @param xs arrays
 */
function interleave<T>(xs: T[][]): T[] {
  var a = [];
  for(var i=0;; i++) {
    var n = 0;
    for(var x of xs)
      if(i<x.length) { a.push(x[i]); n++; }
    if(n===0) break;
  }
  return a;
}
export default interleave;
