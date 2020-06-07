import {every as iterableEvery} from 'extra-iterable';
import type {testFn} from './_types';

/**
 * Checks if all values satisfy a test.
 * @param x an array
 * @param fn test function (v, i ,x)
 * @param ths this argument
 */
function every<T>(x: T[], fn: testFn<T>, ths: object=null): boolean {
  return iterableEvery(x, fn, ths);
}
export default every;
