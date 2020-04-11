import cmp from './_cmp';
import type {compareFn} from './_types';

/**
 * Checks if arrays have no value in common.
 * @param x an array
 * @param y another array
 * @param fn compare function (a, b)
 */
function isDisjoint<T>(x: Iterable<T>, y: Iterable<T>, fn: compareFn<T>=null): boolean {
  var fn = fn||cmp;
  for(var v of y) {
    for(var u of x)
      if(fn(u, v)===0) return false;
  }
  return true;
}
export default isDisjoint;
