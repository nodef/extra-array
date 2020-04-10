import type {testFn} from './_types';

/**
 * Counts values which satisfy a test.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 */
function count<T>(x: Iterable<T>, fn: testFn<T>, ths: object=null): number {
  var n = 0, i = -1;
  for(var v of x)
    if(fn.call(ths, v, ++i, x)) n++;
  return n;
}
export default count;
