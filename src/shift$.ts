/**
 * Removes first value.
 * @param x an array (updated)
 * @returns value
 */
function shift$<T>(x: T[]): T {
  var u = x[0];
  for(var i=1, I=x.length; i<I; i++)
    x[i-1] = x[i];
  x.length = Math.max(I-1, 0);
  return u;
}
export default shift$;
