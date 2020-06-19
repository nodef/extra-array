import type {testFn} from './_types';

function everyIf<T>(x: Iterable<T>): boolean {
  for(var v of x)
    if(!v) return false;
  return true;
}

function everyTest<T>(x: Iterable<T>, fn: testFn<T>): boolean {
  var i = -1;
  for(var v of x)
    if(!fn(v, ++i, x)) return false;
  return true;
}

/**
 * Checks if all values satisfy a test.
 * @param x an iterable
 * @param fn test function (v, i, x)
 */
function every<T>(x: Iterable<T>, fn: testFn<T>=null): boolean {
  if(fn) return everyTest(x, fn);
  else return everyIf(x);
}
export default every;
