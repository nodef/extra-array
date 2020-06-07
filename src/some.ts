import {some as iterableSome} from 'extra-iterable';
import type {testFn} from './_types';

/**
 * Checks if any value satisfies a test.
 * @param x an array
 * @param fn test function (v, i ,x)
 * @param ths this argument
 */
function some<T>(x: Iterable<T>, fn: testFn<T>, ths: object=null): boolean {
  return iterableSome(x, fn, ths);
}
export default some;
