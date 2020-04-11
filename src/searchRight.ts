import cmp from './_cmp';
import type {compareFn} from './_types';

/**
 * Searches a value from right.
 * @param x an array
 * @param v search value
 * @param fn compare function (a, b)
 * @returns index of value, -1 if not found
 */
function searchRight<T>(x: T[], v: T, fn: compareFn<T>=null): number {
  var fn = fn||cmp;
  for(var i=x.length-1; i>=0; i--)
    if(fn(x[i], v)===0) return i;
  return -1;
}
export default searchRight;
