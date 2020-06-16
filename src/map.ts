import type {mapFn} from './_types';

/**
 * Updates values based on map function.
 * @param x an array
 * @param fn map function (v, i, x)
 */
function map<T, U=T>(x: T[], fn: mapFn<T, T|U>): (T|U)[] {
  return x.map(fn);
}
export default map;
