import {find as iterableFind} from 'extra-iterable';
import type {testFn} from './_types';

/**
 * Finds first value passing a test.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 */
function find<T>(x: Iterable<T>, fn: testFn<T>, ths: object=null): T {
  return iterableFind(x, fn, ths);
}
export default find;
