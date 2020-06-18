import type {testFn} from './_types';

function someIf<T>(x: Iterable<T>): boolean {
  for(var v of x)
    if(v) return true;
  return false;
}

function someTest<T>(x: Iterable<T>, fn: testFn<T>): boolean {
  var i = -1;
  for(var v of x)
    if(fn(v, ++i, x)) return true;
  return false;
}

/**
 * Checks if any value satisfies a test.
 * @param x an array
 * @param fn test function (v, i, x)
 */
function some<T>(x: Iterable<T>, fn: testFn<T>=null): boolean {
  if(fn) return someTest(x, fn);
  else return someIf(x);
}
export default some;
