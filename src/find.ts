import type {testFn} from './_types';

/**
 * Finds leftmost value passing the test.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 */
function find<T>(x: T[], fn: testFn<T>, ths: object=null): T {
  return x.find(fn, ths);
}
export default find;
