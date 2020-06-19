import type {testFn} from './_types';

/**
 * Counts values which satisfy a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
function count<T>(x: Iterable<T>, ft: testFn<T>): number {
  var a = 0, i = -1;
  for(var v of x)
    if(ft(v, ++i, x)) a++;
  return a;
}
export default count;
