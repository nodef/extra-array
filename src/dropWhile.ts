import type {testFn} from './_types';

/**
 * Drops values till a test passes.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 */
function dropWhile<T>(x: T[], fn: testFn<T>, ths: object=null): T[] {
  for(var i=0, I=x.length; i<I; i++)
    if(!fn.call(ths, x[i], i, x)) break;
  return x.slice(i);
}
export default dropWhile;
