import arange from './_arange';

/**
 * Returns evenly spaced values within given interval.
 * @param {number} v start of interval
 * @param {number} V end of interval
 * @param {number?} n no. of values in between (100)
 * @returns {Array}
 */
function linspace(v: number, V: number, n: number=100): number[] {
  var stp = (V-v)/(n-1);
  return arange(v, V+stp, stp);
}
export default linspace;
