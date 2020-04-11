import cmp from './_cmp';
import {compareFn} from './_types';

/**
 * Finds largest value.
 * @param x an array
 * @param fn compare function (a, b)
 */
function max<T>(x: Iterable<T>, fn: compareFn<T>=null): T {
  var fn = fn||cmp, m = x[0];
  for(var v of x)
    if(fn(v, m)>0) m = v;
  return m;
}
export default max;
