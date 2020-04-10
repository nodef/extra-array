import type {testFn} from './_types';

/**
 * Finds index of leftmost value passing the test.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 * @returns index of value, -1 if not found
 */
function findIndex<T>(x: T[], fn: testFn<T>, ths: object=null): number {
  return x.findIndex(fn, ths);
}
export default findIndex;
