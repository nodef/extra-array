import {count as iterableCount} from 'extra-iterable';
import type {testFn} from './_types';

/**
 * Counts values which satisfy a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
function count<T>(x: T[], ft: testFn<T>): number {
  return iterableCount(x, ft);
}
export default count;
