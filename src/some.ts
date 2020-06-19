import type {testFn} from './_types';

function someBool<T>(x: T[]): boolean {
  for(var i=0, I=x.length; i<I; i++)
    if(x[i]) return true;
  return false;
}

/**
 * Checks if any value satisfies a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
function some<T>(x: T[], ft: testFn<T>=null): boolean {
  if(ft) return x.some(ft);
  else return someBool(x);
}
export default some;
