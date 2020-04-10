import arange from './_arange';

/**
 * Returns evenly spaced values within given interval.
 * @param v start of interval
 * @param V end of interval
 * @param n no. of values in between (100)
 */
function linspace(v: number, V: number, n: number=100): number[] {
  var stp = (V-v)/(n-1);
  return arange(v, V+stp, stp);
}
export default linspace;
