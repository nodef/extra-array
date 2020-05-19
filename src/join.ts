/**
 * Joins values together.
 * @param x an array
 * @param sep separator (,)
 */
function join<T>(x: T[], sep: string=','): string {
  return x.join(sep);
}
export default join;
