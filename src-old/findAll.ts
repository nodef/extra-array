import type {testFn} from "./_types";

/**
 * Finds all values passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
function findAll<T>(x: T[], ft: testFn<T>): T[] {
  return x.filter(ft);
}
export default findAll;
