import {findIndex as iterableFindIndex} from 'extra-iterable';
import type {testFn} from './_types';

/**
 * Finds index of leftmost value passing a test.
 * @param x an array
 * @param fn test function (v, i, x)
 * @returns index of value, -1 if not found
 */
function findIndex<T>(x: Iterable<T>, fn: testFn<T>): number {
  return iterableFindIndex(x, fn);
}
export default findIndex;
