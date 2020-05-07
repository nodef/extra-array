import iterableSome from '@extra-iterable/some';
import type {testFn} from './_types';

/**
 * Checks if any value satisfies a test.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 */
function some<T>(x: Iterable<T>, fn: testFn<T>, ths: object=null) {
  return iterableSome(x, fn, ths);
}
export default some;
