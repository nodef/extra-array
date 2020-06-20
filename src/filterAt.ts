/**
 * Keeps values at given indices only.
 * @param x an array (updated)
 * @param is indices (sorted)
 * @returns x
 */
function filterAt<T>(x: T[], is: number[]): T[] {
  var X = x.length, a = [];
  for(var i of is)
    if(i>=0 && i<X) a.push(x[i]);
  return a;
}
export default filterAt;
