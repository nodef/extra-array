import iterableCount from '@extra-iterable/count';
import type {testFn} from './_types';

/**
 * Counts values which satisfy a test.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 */
function count<T>(x: T[], fn: testFn<T>, ths: object=null): number {
  return iterableCount(x, fn, ths);
}
export default count;
