import type {combineFn} from './_types';

/**
 * Estimates new values between existing ones.
 * @param x an array
 * @param fc combine function (a, b)
 */
function interpolate<T>(x: Iterable<T>, fc: combineFn<T>): T[] {
  var a = [], u: T, i = -1;
  for(var v of x) {
    if(++i>0) a.push(fc(u, v));
    a.push(u = v);
  }
  return a;
}
export default interpolate;
