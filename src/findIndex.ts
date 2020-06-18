import {search as iterableSearch} from 'extra-iterable';
import type {testFn} from './_types';

/**
 * Finds index of leftmost value passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns index of value, -1 if not found
 */
function findIndex<T>(x: Iterable<T>, ft: testFn<T>): number {
  return iterableSearch(x, ft);
}
export default findIndex;
