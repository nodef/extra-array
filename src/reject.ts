import type {testFn} from './_types';

/**
 * Discards values which pass a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
function reject<T>(x: Iterable<T>, ft: testFn<T>): T[] {
  var a = [], i = -1;
  for(var v of x)
    if(!ft(v, ++i, x)) a.push(v);
  return a;
}
export default reject;
