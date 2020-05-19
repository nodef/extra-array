import find from '@extra-iterable/find';
import type {testFn} from './_types';

/**
 * Finds first value passing a test.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 */
function findDeclare<T>(x: Iterable<T>, fn: testFn<T>, ths: object=null): T {
  return find(x, fn, ths);
}
export default find;
