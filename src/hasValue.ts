import searchValue from "./searchValue";
import type {compareFn, mapFn} from "./_types";

/**
 * Checks if array has a value.
 * @param x an array
 * @param v value?
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function hasValue<T, U=T>(x: Iterable<T>, v: T, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  return searchValue(x, v, fc, fm) >= 0;
}
export default hasValue;
