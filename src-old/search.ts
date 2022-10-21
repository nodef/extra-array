import type {testFn} from "./_types";

/**
 * Finds index of first value passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns index of value, -1 if not found
 */
function search<T>(x: T[], ft: testFn<T>): number {
  return x.findIndex(ft);
}
export default search;
