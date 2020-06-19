import type {testFn} from './_types';

function everyBool<T>(x: T[]): boolean {
  for(var i=0, I=x.length; i<I; i++)
    if(!x[i]) return false;
  return true;
}

/**
 * Checks if all values satisfy a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
function every<T>(x: T[], ft: testFn<T>=null): boolean {
  if(ft) return x.every(ft);
  else return everyBool(x);
}
export default every;
