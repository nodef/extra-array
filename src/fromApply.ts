import type {mapFn} from './_types';

/**
 * Generates array from function application.
 * @param fn map function (v, i, x)
 * @param v start value
 * @param n number of values (0)
 */
function fromApply<T>(fn: mapFn<T, T>, v: T, n: number=0): T[] {
  var a = [];
  if(n!==0) a.push(v);
  for(var i=1; i!==n; i++)
    a.push(v = fn(v, i, null));
  return a;
}
export default fromApply;
