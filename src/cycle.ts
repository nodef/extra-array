import concat$ from './concat$';

/**
 * Gives values that cycle through an array.
 * @param x an array
 * @param n number of values
 */
function cycle<T>(x: T[], n: number): T[] {
  var a = [], X = x.length;
  if(X===0) return a;
  for(var i=0, I=Math.floor(n/X); i<I; i++)
    concat$(a, x);
  return concat$(a, x.slice(0, n % X));
}
export default cycle;
