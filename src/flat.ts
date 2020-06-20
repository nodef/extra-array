import id from './_id';
import is from './is';
import type {mapFn, testFn} from './_types';

function flatTo(x: Iterable<any>, n: number, fm: mapFn<any, any>, ft: testFn<any>, a: any[]): any[] {
  var i = -1;
  for(var v of x) {
    var v1 = fm(v, ++i, x);
    if(n!==0 && ft(v1, i, x)) flatTo(v, n-1, fm, ft, a);
    else a.push(v1);
  }
  return a;
}

/**
 * Flattens nested array to given depth.
 * @param x a nested array
 * @param n maximum depth (-1 => all)
 * @param fm map function (v, i, x)
 * @param ft test function (v, i, x)
 */
function flat(x: Iterable<any>, n: number=-1, fm: mapFn<any, any>=null, ft: testFn<any>=null): any[] {
  var fm = fm||id, ft = ft||is;
  return flatTo(x, n, fm, ft, []);
}
export default flat;
