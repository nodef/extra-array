import concat$ from './concat$';

/**
 * Removes or replaces existing values.
 * @param x an array
 * @param i remove index
 * @param n number of values to remove (rest)
 * @param vs values to insert
 * @returns [removed, array]
 */
function splice<T>(x: T[], i: number, n: number=x.length-i, ...vs: T[]): [T[], T[]] {
  var r = x.slice(i, i+n);
  var u = concat$(x.slice(0, i), vs, x.slice(i+n));
  return [r, u];
}
export default splice;
