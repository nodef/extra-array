import iterableFindRight from '@extra-iterable/find-right';
import type {testFn} from './_types';

/**
 * Finds rightmost value passing a test.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 */
function findRight<T>(x: Iterable<T>, fn: testFn<T>, ths: object=null): T {
  return iterableFindRight(x, fn, ths);
}
export default findRight;
