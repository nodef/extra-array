import type {mapFn} from './_types';

/**
 * Updates values based on map function.
 * @param x an array
 * @param fn map function (v, i, x)
 * @param ths this argument
 */
function map<T, U>(x: T[], fn: mapFn<T, U>, ths: object=null): (T|U)[] {
  return x.map(fn, ths);
}
export default map;
