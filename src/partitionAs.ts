import {partitionAs as iterablePartitionAs} from 'extra-iterable';
import type {mapFn} from './_types';

/**
 * Segregates values by similarity.
 * @param x an array
 * @param fn map function (v, i, x)
 * @returns Map {key => values}
 */
function partitionAs<T, U=T>(x: Iterable<T>, fn: mapFn<T, T|U>=null): Map<T|U, T[]> {
  return iterablePartitionAs(x, fn);
}
export default partitionAs;
