import id from './_id';
import type {mapFn} from './_types';

/**
 * Checks if there are no duplicate values.
 * @param x an array
 * @param fn map function (v, i, x)
 * @param ths this argument
 */
function isUniqueOn<T, U>(x: T[], fn: mapFn<T, U>=null, ths: object=null): boolean {
  var fn = fn||id;
  for(var i=0, I=x.length; i<I; i++) {
    var u = fn.call(ths, x[i], i, x);
    for(var j=0; j<i; j++) {
      var v = fn.call(ths, x[j], j, x);
      if(u===v) return false;
    }
  }
  return true;
}
export default isUniqueOn;
