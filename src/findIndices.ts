import type {testFn} from './_types';

/**
 * Finds indices of values passing the test.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 */
function findIndices<T>(x: T[], fn: testFn<T>, ths: object=null): number[] {
  var a = [], i = -1;
  for(var v of x)
    if(fn.call(ths, v, ++i, x)) a.push(i);
  return a;
}
export default findIndices;
