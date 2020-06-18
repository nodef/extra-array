import concat$ from './concat$';
import id from './_id';
import type {mapFn} from './_types';

/**
 * Flattens nested array, based on map function.
 * @param x an array
 * @param fm map function (v, i, x)
 */
function flatMap(x: Iterable<any>, fm: mapFn<any, any>=null): any[] {
  var fm = fm||id;
  var a = [], i = -1;
  for(var v of x) {
    var v1 = fm(v, ++i, x);
    if(Array.isArray(v1)) concat$(a, v1);
    else a.push(v1);
  }
  return a;
}
export default flatMap;
