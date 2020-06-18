import type {testFn} from './_types';

/**
 * Scans while a test passes, from right.
 * @param x an iterable
 * @param ft test function (v, i, x)
 * @returns first index where test passes till end
 */
function scanWhileRight<T>(x: T[], ft: testFn<T>): number {
  for(var i=x.length-1; i>=0; i--)
    if(!ft(x[i], i, x)) break;
  return i+1;
}
export default scanWhileRight;
