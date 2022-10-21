/**
 * Places a separator between every value.
 * @param x an array
 * @param v separator
 */
function intersperse<T>(x: Iterable<T>, v: T): T[] {
  var a=[], i = -1;
  for(var u of x) {
    if(++i>0) a.push(v);
    a.push(u);
  }
  return a;
}
export default intersperse;
