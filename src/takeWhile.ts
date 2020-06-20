import scanWhile from'./scanWhile';
import type {testFn} from './_types';

/**
 * Keeps values from left, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 */
function takeWhile<T>(x: T[], ft: testFn<T>): T[] {
  return x.slice(0, scanWhile(x, ft));
}
export default takeWhile;
