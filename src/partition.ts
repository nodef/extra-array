import type {testFn} from './_types';

/**
 * Segregates array keeping similar values together.
 * @param x an array
 * @param fn test function (v, i, x)
 * @param ths this argument
 * @returns [satisfies, doesnt]
 */
function partition<T>(x: Iterable<T>, fn: testFn<T>, ths: object=null): [T[], T[]] {
  var t = [], f = [], i = -1;
  for(var v of x) {
    if(fn.call(ths, v, ++i, x)) t.push(v);
    else f.push(v);
  }
  return [t, f];
}
export default partition;
