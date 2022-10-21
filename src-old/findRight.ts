import type {testFn} from "./_types";

/**
 * Finds last value passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
function findRight<T>(x: T[], ft: testFn<T>): T {
  for(var i=x.length-1; i>=0; i--)
    if(ft(x[i], i, x)) return x[i];
}
export default findRight;
