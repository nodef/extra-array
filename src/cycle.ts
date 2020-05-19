import index from './index!';
import concat$ from './concat$';

/**
 * Gives values that cycle through array.
 * @param x an array
 * @param i start index (0)
 * @param n number of values (X)
 */
function cycle<T>(x: T[], i: number=0, n: number=x.length): T[] {
  var X = x.length;
  if(n<=0 || X===0) return [];
  var i = index(x, i);
  var a = x.slice(i, i+n);
  n -= a.length;
  for(var m=0, M=Math.floor(n/X); m<M; m++)
    concat$(a, x);
  return concat$(a, x.slice(0, n % X));
}
export default cycle;
