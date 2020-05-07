import iterableEvery from '@extra-iterable/every';
import type {testFn} from './_types';

/**
 * Checks if all values satisfy a test.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 */
function every<T>(x: Iterable<T>, fn: testFn<T>, ths: object=null) {
  return iterableEvery(x, fn, ths);
}
export default every;
