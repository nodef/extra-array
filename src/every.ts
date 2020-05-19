import every from '@extra-iterable/every';
import type {testFn} from './_types';

/**
 * Checks if all values satisfy a test.
 * @param x an array
 * @param fn test function (v, i ,x)
 * @param ths this argument
 */
function everyDeclare<T>(x: T[], fn: testFn<T>, ths: object=null): boolean {
  return every(x, fn, ths);
}
export default every;
