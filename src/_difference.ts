import id from './_id';
import cmp from './_cmp';
import uniqueSet from './_uniqueSet';
import type {compareFn, mapFn} from './_types';

function differenceMap<T, U=T>(x: Iterable<T>, y: Iterable<T>, fn: mapFn<T, T|U>=null): T[] {
  var s = uniqueSet(y, fn);
  var a = [], i = -1;
  var fn = fn||id;
  for(var u of x) {
    var u1 = fn(u, ++i, x);
    if(!s.has(u1)) a.push(u);
  }
  return a;
}

function differenceDual<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  var fc = fc||cmp, fm = fm||id;
  var a = [], i = -1;
  x: for(var u of x) {
    var u1 = fm(u, ++i, x), j = -1;
    for(var v of y) {
      var v1 = fm(v, ++j, y);
      if(fc(u1, v1)===0) continue x;
    }
    a.push(u);
  }
  return a;
}

/**
 * Gives values of array not present in another.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function difference<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  if(fc) return differenceDual(x, y, fc, fm);
  else return differenceMap(x, y, fm);
}
export default difference;
