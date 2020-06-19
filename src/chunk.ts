/**
 * Breaks array into chunks of given size.
 * @param x an array
 * @param n chunk size (1)
 * @param s chunk step (n)
 */
function chunk<T>(x: T[], n: number=1, s: number=n): T[][] {
  var a = [];
  for(var i=0, I=x.length; i<I; i+=s)
    a.push(x.slice(i, i+n));
  return a;
}
export default chunk;
