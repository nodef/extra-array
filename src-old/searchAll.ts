import type {testFn} from "./_types";

/**
 * Finds indices of values passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
function searchAll<T>(x: Iterable<T>, ft: testFn<T>): number[] {
  var a = [], i = -1;
  for(var v of x)
    if(ft(v, ++i, x)) a.push(i);
  return a;
}
export default searchAll;
