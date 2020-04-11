import cmp from './_cmp';
import type {compareFn} from './_types';

/**
 * Searches a value from left.
 * @param x an array
 * @param v search value
 * @param fn compare function (a, b)
 * @returns index of value, -1 if not found
 */
function search<T>(x: T[], v: T, fn: compareFn<T>=null): number {
  var fn = fn||cmp;
  for(var i=0, I=x.length; i<I; i++)
    if(fn(x[i], v)===0) return i;
  return -1;
}
export default search;
