/**
 * Breaks array after given indices.
 * @param x an array
 * @param is split indices (sorted)
 * @returns [...pieces]
 */
function cutRight<T>(x: T[], is: Iterable<number>): T[][] {
  var a = [], i = 0;
  for(var j of is) {
    j = j<0? x.length:j;
    a.push(x.slice(i, j+1));
    i = j+1;
  }
  a.push(x.slice(j+1));
  return a;
}
export default cutRight;
