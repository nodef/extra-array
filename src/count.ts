import count from '@extra-iterable/count';
import type {testFn} from './_types';

/**
 * Counts values which satisfy a test.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 */
function countDeclare<T>(x: T[], fn: testFn<T>, ths: object=null): number {
  return count(x, fn, ths);
}
export default count;
