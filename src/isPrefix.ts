import cmp from './_cmp';
import type {compareFn} from './_types';

/**
 * Checks if array starts with a prefix.
 * @param x an array
 * @param y prefix?
 * @param fn compare function (a, b)
 */
function isPrefix<T>(x: T[], y: T[], fn: compareFn<T>=null): boolean {
  var fn = fn||cmp, i = -1;
  for(var v of y)
    if(fn(x[++i], v)!==0) return false;
  return true;
}
export default isPrefix;
