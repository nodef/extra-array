import id from './_id';
import cmp from './_cmp';
import type {mapFn, compareFn} from './_types';

/**
 * Finds smallest and largest entries.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns [smallest, largest]
 */
function range<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): [[number, T], [number, T]] {
  var fc = fc||cmp, fm = fm||id;
  var mi = -1, mu: T, mv: T|U;
  var ni = -1, nu: T, nv: T|U;
  var i = -1;
  for(var u of x) {
    var v = fm(u, ++i, x);
    if(i===0 || fc(v, mv)<0) { mi = i; mu = u; mv = v; }
    if(i===0 || fc(v, nv)>0) { ni = i; nu = u; nv = v; }
  }
  return [[mi, mu], [ni, nu]];
}
export default range;
