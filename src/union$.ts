import cmp from './_cmp';
import type {compareFn} from './_types';

/**
 * Gives values present in any array.
 * @param x an array (updated)
 * @param y another array
 * @param fn compare function (a, b)
 * @returns x
 */
function union$<T>(x: T[], y: Iterable<T>, fn: compareFn<T>=null): T[] {
  var fn = fn||cmp;
  y: for(var v of y) {
    for(var u of x)
      if(fn(u, v)===0) continue y;
    x.push(v);
  }
  return x;
}
export default union$;
