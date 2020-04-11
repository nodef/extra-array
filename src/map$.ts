import type {mapFn} from './_types';

/**
 * Updates values based on map function.
 * @param x an array (updated)
 * @param fn map function (v, i, x)
 * @param ths this argument
 * @returns x
 */
function map$<T>(x: T[], fn: mapFn<T, T>, ths: object=null): T[] {
  for(var i=0, I=x.length; i<I; i++)
    x[i] = fn.call(ths, x[i], i, x);
  return x;
}
export default map$;
