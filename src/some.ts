import {some as iterableSome} from 'extra-iterable';
import type {testFn} from './_types';

/**
 * Checks if any value satisfies a test.
 * @param x an array
 * @param fn test function (v, i ,x)
 */
function some<T>(x: Iterable<T>, fn: testFn<T>): boolean {
  return iterableSome(x, fn);
}
export default some;
