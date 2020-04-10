/**
 * Fills with given value.
 * @param x an array (updated)
 * @param v value
 * @param i start index (0)
 * @param I end index (end)
 * @returns x
 */
function fill$<T>(x: T[], v: T, i: number=0, I: number=x.length): T[] {
  return x.fill(v, i, I);
}
export default fill$;
