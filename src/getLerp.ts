import get from './get';

/**
 * Gets value at fractional index.
 * @param x an array
 * @param f fractional index 0->1
 */
function getLerp<T>(x: T[], f: number): T {
  var i = Math.floor(f * x.length);
  return get(x, i);
}
export default getLerp;
