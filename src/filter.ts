import type {testFn} from './_types';

/**
 * Keeps values which pass a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
function filter<T>(x: T[], ft: testFn<T>): T[] {
  return x.filter(ft);
}
export default filter;
