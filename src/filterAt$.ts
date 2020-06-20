/**
 * Keeps values at given indices only.
 * @param x an array (updated)
 * @param is indices (sorted)
 * @returns x
 */
function filter$<T>(x: T[], is: number[]): T[] {
  for(var i=0, j=0, I=x.length; i<I; i++)
    if(is.includes(i)) x[j++] = x[i];
  x.length = j;
  return x;
}
export default filter$;
