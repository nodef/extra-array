import id from "./_id";
import type {mapFn} from "./_types";

/**
 * Counts occurrences of values.
 * @param x an array
 * @param fm map function (v, i, x)
 * @returns Map {value => count}
 */
function countAs<T, U=T>(x: Iterable<T>, fm: mapFn<T, T|U>=null): Map<T|U, number> {
  var fm = fm||id;
  var a = new Map(), i = -1;
  for(var v of x) {
    var v1 = fm(v, ++i, x);
    a.set(v1, (a.get(v1)||0) + 1);
  }
  return a;
}
export default countAs;
