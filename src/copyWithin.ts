/**
 * Copies part of array within.
 * @param x an array
 * @param j write index
 * @param i read start index (0)
 * @param I read end index (end)
 */
function copyWithin<T>(x: T[], j: number, i: number=0, I: number=x.length): T[] {
  var a = x.slice(0, j)
  var num = Math.min(I-i, x.length-i);
  for(var J=Math.min(j+num, x.length); j<J; j++, i++)
    a[j] = x[i];
  for(var J=x.length; j<J; j++)
    a[j] = x[j];
  return a;
}
export default copyWithin;
