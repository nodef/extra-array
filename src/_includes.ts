import isValue from './isValue';

/**
 * Checks if array has a value.
 * @param x an array
 * @param v search value
 */
function includes<T>(x: Iterable<T>, v: T): boolean {
  return isValue(x, v);
}
export default includes;
