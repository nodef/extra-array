/**
 * Checks if value is array.
 * @param v value
 */
function is(v: any): v is any[] {
  return Array.isArray(v);
}
export default is;
