import type {testFn} from './_types';

/**
 * Finds rightmost value passing the test.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 */
function findRight<T>(x: T[], fn: testFn<T>, ths: object=null): T {
  for(var i=x.length-1; i>=0; i--)
    if(fn.call(ths, x[i], i, x)) return x[i];
}
export default findRight;
