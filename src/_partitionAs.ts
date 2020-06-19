import {partitionAs as iterablePartitionAs} from 'extra-iterable';
import type {mapFn} from './_types';

/**
 * Segregates values by similarity.
 * @param x an array
 * @param fm map function (v, i, x)
 * @returns Map {key => values}
 */
function partitionAs<T, U=T>(x: Iterable<T>, fm: mapFn<T, T|U>=null): Map<T|U, T[]> {
  return iterablePartitionAs(x, fm);
}
export default partitionAs;
