import {find as iterableFind} from 'extra-iterable';
import type {testFn} from './_types';

/**
 * Finds first value passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
function find<T>(x: Iterable<T>, ft: testFn<T>): T {
  return iterableFind(x, ft);
}
export default find;
