import cmp from './_cmp';
import type {compareFn} from './_types';

/**
 * Breaks array keeping similar values together.
 * @param x an array
 * @param fn compare function (a, b)
 */
function group<T>(x: Iterable<T>, fn: compareFn<T>=null): T[][] {
  var fn = fn||cmp;
  var u = x[0], a = [], b = [];
  for(var v of x) {
    if(fn(u, v)===0) b.push(v);
    else { a.push(b); b = [v]; }
    u = v;
  }
  a.push(b);
  return a;
}
export default group;
