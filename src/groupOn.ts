import id from './_id';
import type {mapFn} from './_types';

/**
 * Breaks array keeping similar values together.
 * @param x an array
 * @param fn map function (v, i, x)
 * @param ths this argument
 */
function groupOn<T, U>(x: Iterable<T>, fn: mapFn<T, U>=null, ths: object=null): T[][] {
  var fn = fn||id;
  var a = [], b = [], i = -1;
  var u1 = fn.call(ths, x[0], 0, x);
  for(var v of x) {
    var v1 = fn.call(ths, v, ++i, x);
    if(u1===v1) b.push(v);
    else { a.push(b); b = [v]; }
    u1 = v1;
  }
  a.push(b);
  return a;
}
export default groupOn;
