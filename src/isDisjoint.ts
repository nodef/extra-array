import id from './_id';
import cmp from './_cmp';
import uniqueSet from './_uniqueSet';
import type {compareFn, mapFn} from './_types';

function isDisjointMap<T, U=T>(x: Iterable<T>, y: Iterable<T>, fm: mapFn<T, T|U>=null): boolean {
  var s = uniqueSet(y, fm);
  var fm = fm||id, i = -1;
  for(var u of x) {
    var u1 = fm(u, ++i, x);
    if(s.has(u1)) return false;
  }
  return true;
}

function isDisjointDual<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  var fc = fc||cmp, fm = fm||id;
  var y1 = [...y].map(fm), i = -1;
  for(var u of x) {
    var u1 = fm(u, ++i, x);
    for(var v1 of y1)
      if(fc(u1, v1)===0) return false;
  }
  return true;
}

/**
 * Checks if arrays have no value in common.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function isDisjoint<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  if(fc) return isDisjointDual(x, y, fc, fm);
  return isDisjointMap(x, y, fm);
}
export default isDisjoint;
