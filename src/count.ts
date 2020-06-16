import {count as iterableCount} from 'extra-iterable';
import type {testFn} from './_types';

/**
 * Counts values which satisfy a test.
 * @param x an array
 * @param fn test function (v, i, x)
 */
function count<T>(x: T[], fn: testFn<T>): number {
  return iterableCount(x, fn);
}
export default count;
