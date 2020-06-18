import type {testFn} from './_types';

/**
 * Scans from left, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns index where test fails
 */
function scanWhile<T>(x: T[], ft: testFn<T>): number {
  for(var i=0, I=x.length; i<I; i++)
  return iterableScanWhile(x, ft);
}
export default scanWhile;
