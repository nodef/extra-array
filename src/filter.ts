import type {testFn} from './_types';

/**
 * Keeps values which pass a test.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 */
function filter<T>(x: T[], fn: testFn<T>, ths: object=null): T[] {
  return x.filter(fn, ths);
}
export default filter;
