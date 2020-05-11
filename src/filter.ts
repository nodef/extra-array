import type {testFn} from './_types';

/**
 * Keeps values which pass a test.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 */
function filter<T>(x: Iterable<T>, fn: testFn<T>, ths: object=null): T[] {
  var a = [], i = -1;
  for(var v of x)
    if(fn.call(ths, v, ++i, x)) a.push(v);
  return a;
}
export default filter;
