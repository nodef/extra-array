import type {testFn} from './_types';

/**
 * Drops values till a test passes.
 * @param x an array
 * @param fn test function (v, i, x)
 */
function dropWhile<T>(x: T[], fn: testFn<T>): T[] {
  for(var i=0, I=x.length; i<I; i++)
    if(!fn(x[i], i, x)) break;
  return x.slice(i);
}
export default dropWhile;
