import type {testFn} from './_types';

/**
 * Extracts values till a test passes.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 */
function takeWhile<T>(x: Iterable<T>, fn: testFn<T>, ths: object=null): T[] {
  var a = [], i = -1;
  for(var v of x) {
    if(!fn.call(ths, v, ++i, x)) break;
    a.push(v);
  }
  return a;
}
export default takeWhile;
