import type {testFn} from "./_types";

/**
 * Keeps values which pass a test.
 * @param x an array (updated)
 * @param ft test function (v, i, x)
 * @returns x
 */
function filter$<T>(x: T[], ft: testFn<T>): T[] {
  for(var i=0, j=0, I=x.length; i<I; i++)
    if(ft(x[i], i, x)) x[j++] = x[i];
  x.length = j;
  return x;
}
export default filter$;
