import type {mapFn} from "./_types";

/**
 * Updates values based on map function.
 * @param x an array
 * @param fm map function (v, i, x)
 */
function map<T, U=T>(x: T[], fm: mapFn<T, T|U>): (T|U)[] {
  return x.map(fm);
}
export default map;
