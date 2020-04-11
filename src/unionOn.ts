import unionOn$ from './unionOn$';
import type {mapFn} from './_types';

/**
 * Gives values present in any array.
 * @param x an array
 * @param y another array
 * @param fn map function (v, i, x)
 * @param ths this argument
 */
function unionOn<T, U>(x: T[], y: Iterable<T>, fn: mapFn<T, U>=null, ths: object=null): T[] {
  return unionOn$(x.slice(), y, fn, ths);
}
export default unionOn;
