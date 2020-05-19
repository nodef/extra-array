import findIndex from '@extra-iterable/find-index';
import type {testFn} from './_types';

/**
 * Finds index of leftmost value passing a test.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 * @returns index of value, -1 if not found
 */
function findIndexDeclare<T>(x: Iterable<T>, fn: testFn<T>, ths: object=null): number {
  return findIndex(x, fn, ths);
}
export default findIndex;
