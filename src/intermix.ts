import concat$ from "./concat$";

/**
 * Places values of an array between another.
 * @param x an array
 * @param y another array
 * @param m number of values from x (1)
 * @param n number of values from y (1)
 * @param s step size for x (m)
 * @param t step size for y (n)
 */
function intermix<T>(x: T[], y: T[], m: number=1, n: number=1, s: number=m, t: number=n): T[] {
  var X = x.length, Y = y.length, a = [];
  for(var i=0, j=0; i<X; i+=s) {
    if(i>0) { for(var k=j, K=k+n; k<K; k++) a.push(y[k % Y]); j += t; }
    concat$(a, x.slice(i, i+m));
  }
  return a;
}
export default intermix;
