import {partition as iterablePartition} from 'extra-iterable';
import type {testFn} from './_types';

/**
 * Segregates values by test result.
 * @param x an array
 * @param fn test function (v, i, x)
 * @returns [satisfies, doesnt]
 */
function partition<T>(x: Iterable<T>, fn: testFn<T>): [T[], T[]] {
  return iterablePartition(x, fn);
}
export default partition;
