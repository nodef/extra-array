import type {testFn} from './_types';

/**
 * Scans from right, until a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns first index where test fails till end
 */
function scanUntilRight<T>(x: T[], ft: testFn<T>): number {
  for(var i=x.length-1; i>=0; i--)
    if(ft(x[i], i, x)) break;
  return i+1;
}
export default scanUntilRight;
