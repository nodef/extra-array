/**
 * Breaks iterable considering indices as separator.
 * @param x an iterable
 * @param is indices (sorted)
 */
function splitAt<T>(x: Iterable<T>, is: number[]): T[][] {
  var a = [], b = [], i = -1;
  for(var v of x) {
    if(!is.includes(++i)) b.push(v);
    else if(b.length) { a.push(b); b = []; }
  }
  if(b.length) a.push(b);
  return a;
}
export default splitAt;
