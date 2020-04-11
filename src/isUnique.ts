import cmp from './_cmp';
import type {compareFn} from './_types';

/**
 * Checks if there are no duplicate values.
 * @param x an array
 * @param fn compare function (a, b)
 */
function isUnique<T>(x: T[], fn: compareFn<T>=null): boolean {
  var fn = fn||cmp;
  for(var i=0, I=x.length; i<I; i++) {
    for(var j=0; j<i; j++)
      if(fn(x[i], x[j])===0) return false;
  }
  return true;
}
export default isUnique;
