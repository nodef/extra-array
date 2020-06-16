import id from './_id';
import cmp from './_cmp';
import uniqueSet from './_uniqueSet';
import type {compareFn, mapFn} from './_types';

function unionCompare$<T>(x: T[], y: Iterable<T>, fn: compareFn<T>=null): T[] {
  var fn = fn||cmp;
  y: for(var v of y) {
    for(var u of x)
      if(fn(u, v)===0) continue y;
    x.push(v);
  }
  return x;
}

function unionMap$<T, U=T>(x: T[], y: Iterable<T>, fn: mapFn<T, T|U>=null): T[] {
  var s = uniqueSet(x, fn);
  var fn = fn||id, i = -1;
  for(var v of y) {
    var v1 = fn(v, ++i, y);
    if(!s.has(v1)) { x.push(v); s.add(v1); }
  }
  return x;
}

function unionDual$<T, U=T>(x: T[], y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  var fc = fc||cmp, fm = fm||id;
  var j = -1;
  y: for(var v of y) {
    var v1 = fm(v, ++j, y), i = -1;
    for(var u of x) {
      var u1 = fm(u, ++i, x);
      if(fc(u1, v1)===0) continue y;
    }
    x.push(v);
  }
  return x;
}

/**
 * Gives values present in any array.
 * @param x an array (updated)
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x
 */
function union$<T, U=T>(x: T[], y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  if(fc) return unionDual$(x, y, fc, fm);
  else return unionMap$(x, y, fm);
}
export default union$;
