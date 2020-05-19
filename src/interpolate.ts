import type {combineFn} from './_types';

/**
 * Estimates new values between existing ones.
 * @param x an array
 * @param fn combine function (a, b)
 */
function interpolate<T>(x: Iterable<T>, fn: combineFn<T>): T[] {
  var a = [], u: T, i = -1;
  for(var v of x) {
    if(++i>0) a.push(fn(u, v));
    a.push(u = v);
  }
  return a;
}
export default interpolate;
