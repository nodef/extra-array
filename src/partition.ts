import partition from '@extra-iterable/partition';
import type {testFn} from './_types';

/**
 * Segregates values by test result.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 * @returns [satisfies, doesnt]
 */
function partitionDeclare<T>(x: Iterable<T>, fn: testFn<T>, ths: object=null): [T[], T[]] {
  return partition(x, fn, ths);
}
export default partition;
