import type {testFn} from './_types';

/**
 * Checks if all values satisfy a test.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 */
function every<T>(x: Iterable<T>, fn: testFn<T>, ths: object=null) {
  var i = -1;
  for(var v of x)
    if(!fn.call(ths, v, ++i, x)) return false;
  return true;
}
export default every;
