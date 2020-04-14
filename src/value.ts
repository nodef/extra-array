import get from './get';

/**
 * Picks an arbitrary value.
 * @param x an array
 * @param r random seed 0->1
 */
function value<T>(x: T[], r: number=Math.random()): T {
  var i = Math.floor(r * x.length);
  return get(x, i);
}
export default value;
