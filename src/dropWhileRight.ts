import scanUntilRight from'./scanUntilRight';
import type {testFn} from './_types';

/**
 * Discards values from right, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 */
function dropWhileRight<T>(x: T[], ft: testFn<T>): T[] {
  return x.slice(0, scanUntilRight(x, ft));
}
export default dropWhileRight;
