import type {testFn} from './_types';

/**
 * Keeps values which pass a test.
 * @param x an array (updated)
 * @param fn test function (v, i, x)
 * @param ths this argument
 * @returns x
 */
function filter$<T>(x: T[], fn: testFn<T>, ths: object=null): T[] {
  for(var i=0, j=0, I=x.length; i<I; i++)
    if(fn.call(ths, x[i], i, x)) x[j++] = x[i];
  x.length = j;
  return x;
}
export default filter$;
