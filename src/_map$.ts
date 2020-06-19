import type {mapFn} from './_types';

/**
 * Updates values based on map function.
 * @param x an array (updated)
 * @param fn map function (v, i, x)
 * @returns x
 */
function map$<T>(x: T[], fn: mapFn<T, T>): T[] {
  for(var i=0, I=x.length; i<I; i++)
    x[i] = fn(x[i], i, x);
  return x;
}
export default map$;
