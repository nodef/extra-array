/**
 * Gives same value.
 * @param v a value
 * @returns v
 */
function id<T>(v: T): T {
  return v;
}
export default id;
