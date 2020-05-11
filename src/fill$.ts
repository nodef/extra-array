import indexRange from './indexRange';

/**
 * Fills with given value.
 * @param x an array (updated)
 * @param v value
 * @param i start index (0)
 * @param I end index (end)
 * @returns x
 */
function fill$<T>(x: T[], v: T, i: number=0, I: number=x.length): T[] {
  var [i, I] = indexRange(x, i, I);
  for(; i<I; i++)
    x[i] = v;
  return x;
}
export default fill$;
