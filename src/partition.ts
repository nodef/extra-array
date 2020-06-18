import {partition as iterablePartition} from 'extra-iterable';
import type {testFn} from './_types';

/**
 * Segregates values by test result.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns [satisfies, doesnt]
 */
function partition<T>(x: Iterable<T>, ft: testFn<T>): [T[], T[]] {
  return iterablePartition(x, ft);
}
export default partition;
