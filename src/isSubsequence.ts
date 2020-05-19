import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

function isSubsequenceCompare<T>(x: Iterable<T>, y: T[], fn: compareFn<T>=null): boolean {
  if(y.length===0) return true;
  var fn = fn||cmp;
  var j = 0, J = y.length;
  for(var u of x)
    if(fn(u, y[j])===0 && (++j)===J) return true;
  return false;
}

function isSubsequenceMap<T, U=T>(x: Iterable<T>, y: T[], fn: mapFn<T, T|U>=null): boolean {
  var fn = fn||id, i = -1;
  var j = 0, J = y.length;
  var y1 = y.map(fn);
  for(var u of x) {
    var u1 = fn(u, ++i, x);
    if(u1===y1[j] && (++j)===J) return true;
  }
  return false;
}

/**
 * Checks if array has a subsequence.
 * @param x an array
 * @param y subsequence?
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function isSubsequence<T, U=T>(x: Iterable<T>, y: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  var fc = fc||cmp, fm = fm||id
  var i = -1, j = 0, J = y.length;
  var y1 = y.map(fm);
  for(var u of x) {
    var u1 = fm(u, ++i, x);
    if(fc(u1, y1[j])!==0) continue;
    if(++j>=J) return true;
  }
  return false;
}
export default isSubsequence;
