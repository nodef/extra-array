import cmp from './_cmp';
import type {compareFn} from './_types';

/**
 * Searches a value throughout.
 * @param x an array
 * @param v search value
 * @param fn compare function (a, b)
 * @returns indices of value
 */
function searchAll<T>(x: T[], v: T, fn: compareFn<T>=null): number[] {
  var fn = fn||cmp, a = [];
  for(var i=0, I=x.length; i<I; i++)
    if(fn(x[i], v)===0) a.push(i);
  return a;
}
export default searchAll;
