import type {testFn} from './_types';

function someIf<T>(x: Iterable<T>): boolean {
  for(var v of x)
    if(v) return true;
  return false;
}

function someTest<T>(x: Iterable<T>, ft: testFn<T>): boolean {
  var i = -1;
  for(var v of x)
    if(ft(v, ++i, x)) return true;
  return false;
}

/**
 * Checks if any value satisfies a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
function some<T>(x: Iterable<T>, ft: testFn<T>=null): boolean {
  if(ft) return someTest(x, ft);
  else return someIf(x);
}
export default some;
