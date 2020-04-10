/**
 * Breaks array at given indices.
 * @param x an array
 * @param is split indices (sorted)
 * @returns [...pieces]
 */
function cut<T>(x: T[], is: Iterable<number>): T[][] {
  var a = [], i = 0;
  for(var j of is) {
    j = j<0? 0:j;
    a.push(x.slice(i, j));
    i = j;
  }
  a.push(x.slice(j));
  return a;
}
export default cut;
