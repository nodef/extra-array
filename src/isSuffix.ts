import cmp from './_cmp';
import type {compareFn} from './_types';

/**
 * Checks if array ends with a suffix.
 * @param x an array
 * @param y suffix?
 * @param fn compare function (a, b)
 */
function isSuffix<T>(x: T[], y: T[], fn: compareFn<T>=null): boolean {
  var fn = fn||cmp, i = x.length-y.length-1;
  for(var v of y)
    if(fn(x[++i], v)!==0) return false;
  return true;
}
export default isSuffix;
