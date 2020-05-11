import concat$ from './concat$';
import id from './_id';
import type {mapFn} from './_types';

/**
 * Flattens nested array, based on map function.
 * @param x an array
 * @param fn map function (v, i, x)
 * @param ths this argument
 */
function flatMap(x: Iterable<any>, fn: mapFn<any, any>=null, ths: object=null): any[] {
  var fn = fn||id;
  var a = [], i = -1;
  for(var v of x) {
    var v1 = fn.call(ths, v, ++i, x);
    if(Array.isArray(v1)) concat$(a, v1);
    else a.push(v1);
  }
  return a;
}
export default flatMap;
