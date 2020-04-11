import cmp from './_cmp';
import type {compareFn} from './_types';

/**
 * Finds smallest and largest values.
 * @param x an array
 * @param fn compare function (a, b)
 * @returns [min, max]
 */
function range<T>(x: Iterable<T>, fn: compareFn<T>=null): [T, T] {
  var fn = fn||cmp, m = x[0], n = m;
  for(var v of x) {
    if(fn(v, m)<0) m = v;
    if(fn(v, n)>0) n = v;
  }
  return [m, n];
}
export default range;
