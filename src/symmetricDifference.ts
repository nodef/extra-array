import from$ from "./from$";
import concat$ from "./concat$";
import difference from "./difference";
import type {compareFn, mapFn} from "./_types";

/**
 * Gives values not present in both arrays.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function symmetricDifference<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  var x0 = from$(x), y0 = from$(y);
  var ax = difference(x0, y0, fc, fm);
  var ay = difference(y0, x0, fc, fm);
  return concat$(ax, ay);
}
export default symmetricDifference;
