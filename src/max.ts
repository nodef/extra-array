import range from "./range";
import {compareFn, mapFn} from "./_types";

/**
 * Finds largest entry.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns [index, value]
 */
function max<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): [number, T] {
  return range(x, fc, fm)[1];
}
export default max;
