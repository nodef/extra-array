import sortOn$ from './sortOn$';
import type {mapFn} from './_types';

/**
 * Arranges values in an order.
 * @param x an array
 * @param fn map function (v, i, x)
 * @param ths this argument
 */
function sortOn<T, U>(x: T[], fn: mapFn<T, U>=null, ths: object=null): T[] {
  return sortOn$(x.slice(), fn, ths);
}
export default sortOn;
