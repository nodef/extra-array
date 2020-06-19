import type {testFn} from './_types';

/**
 * Finds first value passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
function find<T>(x: T[], ft: testFn<T>): T {
  return x.find(ft);
}
export default find;
