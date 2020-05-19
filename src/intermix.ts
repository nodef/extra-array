import concat$ from './concat$';

/**
 * Places values of an array between another.
 * @param x an array
 * @param y another array
 * @param s step size for x (1)
 * @param t step size for y (1)
 * @param m number of values from x (s)
 * @param n number of values from y (t)
 */
function intermix<T>(x: T[], y: T[], s: number=1, t: number=1, m: number=s, n: number=t): T[] {
  var X = x.length, Y = y.length, a = [];
  for(var i=0, j=0; i<X; i+=s) {
    if(i>0) { for(var k=j, K=k+n; k<K; k++) a.push(y[k % Y]); j += t; }
    concat$(a, x.slice(i, i+m));
  }
  return a;
}
export default intermix;
