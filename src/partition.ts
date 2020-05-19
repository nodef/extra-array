import iterablePartition from '@extra-iterable/partition';
import type {testFn} from './_types';

/**
 * Segregates values by test result.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 * @returns [satisfies, doesnt]
 */
function partition<T>(x: Iterable<T>, fn: testFn<T>, ths: object=null): [T[], T[]] {
  return iterablePartition(x, fn, ths);
}
export default partition;
