import {every as iterableEvery} from 'extra-iterable';
import type {testFn} from './_types';

/**
 * Checks if all values satisfy a test.
 * @param x an array
 * @param ft test function (v, i ,x)
 */
function every<T>(x: T[], ft: testFn<T>): boolean {
  return iterableEvery(x, ft);
}
export default every;
