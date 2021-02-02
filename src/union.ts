import union$ from "./union$";
import type {compareFn, mapFn} from "./_types";

/**
 * Gives values present in any array.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function union<T, U=T>(x: T[], y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  return union$(x.slice(), y, fc, fm);
}
export default union;
