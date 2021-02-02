import id from "./_id";
import type {mapFn} from "./_types";

/**
 * Segregates values by similarity.
 * @param x an array
 * @param fm map function (v, i, x)
 * @returns Map {key => values}
 */
function partitionAs<T, U=T>(x: Iterable<T>, fm: mapFn<T, T|U>=null): Map<T|U, T[]> {
  var fm = fm||id;
  var a = new Map(), i = -1;
  for(var v of x) {
    var v1 = fm(v, ++i, x);
    if(!a.has(v1)) a.set(v1, []);
    a.get(v1).push(v);
  }
  return a;
}
export default partitionAs;
