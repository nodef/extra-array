import scanUntil from"./scanUntil";
import type {testFn} from "./_types";

/**
 * Discards values from left, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 */
function dropWhile<T>(x: T[], ft: testFn<T>): T[] {
  return x.slice(scanUntil(x, ft));
}
export default dropWhile;
