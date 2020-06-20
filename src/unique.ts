import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

function uniqueMap<T, U=T>(x: Iterable<T>, fn: mapFn<T, T|U>=null): T[] {
  var fn = fn||id;
  var s = new Set();
  var a = [], i = -1;
  for(var v of x) {
    var v1 = fn(v, ++i, x);
    if(s.has(v1)) continue;
    s.add(v1); a.push(v);
  }
  return a;
}

function uniqueDual<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  var fc=fc||cmp, fm = fm||id;
  var s = [], a = [], i = -1;
  x: for(var v of x) {
    var v1 = fm(v, ++i, x);
    for(var u1 of s)
      if(fc(u1, v1)===0) continue x;
    s.push(v1); a.push(v);
  }
  return a;
}

/**
 * Removes duplicate values.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function unique<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  if(fc) return uniqueDual(x, fc, fm);
  else return uniqueMap(x, fm);
}
export default unique;
