import index from './index!';

/**
 * Breaks array at given indices.
 * @param x an array
 * @param is split indices (sorted)
 * @returns [...pieces]
 */
function cut<T>(x: T[], is: Iterable<number>): T[][] {
  var a = [], j = 0;
  for(var i of is) {
    i = Math.max(j, index(x, i));
    a.push(x.slice(j, i));
    j = i;
  }
  a.push(x.slice(i));
  return a;
}
export default cut;
