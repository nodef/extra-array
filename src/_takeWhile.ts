import type {testFn} from './_types';

/**
 * Keeps values from left, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 */
function takeWhile<T>(x: Iterable<T>, ft: testFn<T>): T[] {
  var a = [], i = -1;
  for(var v of x) {
    if(!ft(v, ++i, x)) break;
    a.push(v);
  }
  return a;
}
export default takeWhile;
