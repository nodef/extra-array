import type {testFn} from './_types';

/**
 * Finds index of last value passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns index of value, -1 if not found
 */
function searchRight<T>(x: T[], ft: testFn<T>): number {
  for(var i=x.length-1; i>=0; i--)
    if(ft(x[i], i, x)) return i;
  return -1;
}
export default searchRight;
