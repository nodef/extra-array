import type {mapFn} from "./_types";

/**
 * Updates values based on map function.
 * @param x an array (updated)
 * @param fm map function (v, i, x)
 * @returns x
 */
function map$<T>(x: T[], fm: mapFn<T, T>): T[] {
  for(var i=0, I=x.length; i<I; i++)
    x[i] = fm(x[i], i, x);
  return x;
}
export default map$;
