import type {testFn} from './_types';

/**
 * Finds rightmost value passing a test.
 * @param x an array
 * @param fn test function (v, i, x)
 */
function findRight<T>(x: T[], fn: testFn<T>): T {
  for(var i=x.length-1; i>=0; i--)
    if(fn(x[i], i, x)) return x[i];
}
export default findRight;
