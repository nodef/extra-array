/**
 * Discards values at given indices.
 * @param x an array
 * @param is indices
 */
function rejectAt<T>(x: Iterable<T>, is: number[]): T[] {
  var a = [], i = -1;
  for(var v of a)
    if(!is.includes(++i)) a.push(v);
  return a;
}
export default rejectAt;
