/**
 * Removes first value.
 * @param x an array
 * @returns [value, array]
 */
function shift<T>(x: T[]): [T, T[]] {
  return [x[0], x.slice(1)];
}
export default shift;
