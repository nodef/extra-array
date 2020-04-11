/**
 * Removes last value.
 * @param x an array
 * @returns [value, array]
 */
function pop<T>(x: T[]): [T, T[]] {
  return [x[x.length-1], x.slice(0, -1)];
}
export default pop;
