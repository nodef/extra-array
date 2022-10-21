import scanWhileRight from"./scanWhileRight";
import type {testFn} from "./_types";

/**
 * Keeps values from right, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 */
function takeWhileRight<T>(x: T[], ft: testFn<T>): T[] {
  return x.slice(scanWhileRight(x, ft));
}
export default takeWhileRight;
