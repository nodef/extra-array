import cmp from './_cmp';
import type {compareFn} from './_types';

/**
 * Checks if array contains an infix.
 * @param x an array
 * @param y infix?
 * @param fn compare function (a, b)
 */
function isInfix<T>(x: Iterable<T>, y: T[], fn: compareFn<T>=null): boolean {
  if(y.length===0) return true;
  var fn = fn||cmp;
  var Y = y.length, J = 0;
  var m = new Array(Y).fill(false);
  for(var u of x) {
    for(var j=J; j>0; j--)
      m[j] = m[j-1] && fn(u, y[j])===0;
    m[0] = fn(u, y[0])===0;
    J = Math.min(J+1, Y-1);
    if(m[Y-1]) return true;
  }
  return false;
}
export default isInfix;
