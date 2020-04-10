import cmp from './_cmp';
import type {compareFn} from './_types';

/**
 * Gives values present in both arrays.
 * @param x an array
 * @param y another array
 * @param fn compare function (a, b)
 */
function intersection<T>(x: Iterable<T>, y: Iterable<T>, fn: compareFn<T>=null): T[] {
  var fn = fn||cmp, a = [];
  x: for(var u of x) {
    for(var v of y)
      if(fn(u, v)===0) { a.push(u); continue x; }
  }
  return a;
}
export default intersection;
