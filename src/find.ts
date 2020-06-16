import {find as iterableFind} from 'extra-iterable';
import type {testFn} from './_types';

/**
 * Finds first value passing a test.
 * @param x an array
 * @param fn test function (v, i, x)
 */
function find<T>(x: Iterable<T>, fn: testFn<T>): T {
  return iterableFind(x, fn);
}
export default find;
