import concat$ from './concat$';

/**
 * Places values of an array between another.
 * @param x an array
 * @param y another array
 * @param m number of values from x (1)
 * @param n number of values from y (1)
 */
function interleave<T>(x: T[], y: T[], m: number=1, n: number=1): T[] {
  var X = x.length, Y = y.length;
  var a = [];
  for(var i=0, j=0; i<X; i+=m) {
    if(i>0) { for(var J=j+n; j<J; j++) a.push(y[j % Y]); }
    concat$(a, x.slice(i, i+m));
  }
  return a;
}
export default interleave;
