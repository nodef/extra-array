/**
 * Breaks array into chunks of given size.
 * @param x an array
 * @param s chunk step (1)
 * @param n chunk size (s)
 */
function chunk<T>(x: T[], s: number=1, n: number=s): T[][] {
  var a = [];
  for(var i=0, I=x.length; i<I; i+=s)
    a.push(x.slice(i, i+n));
  return a;
}
export default chunk;
