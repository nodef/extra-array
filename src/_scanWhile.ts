import type {testFn} from './_types';

/**
 * Scans from left, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns index where test fails
 */
function scanWhile<T>(x: Iterable<T>, ft: testFn<T>): number {
  var i = -1;
  for(var v of x)
    if(!ft(v, ++i, x)) return i;
  return ++i;
}
export default scanWhile;
