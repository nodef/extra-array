import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

function isUniqueMap<T, U=T>(x: Iterable<T>, fm: mapFn<T, T|U>=null): boolean {
  var fm = fm||id;
  var s = new Set(), i = -1;
  for(var v of x) {
    var v1 = fm(v, ++i, x);
    if(s.has(v1)) return false;
    s.add(v1);
  }
  return true;
}

function isUniqueDual<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  var fc = fc||cmp, fm = fm||id;
  var x1 = [...x].map(fm);
  for(var u1 of x1) {
    for(var v1 of x1)
      if(fc(u1, v1)===0) return false;
  }
  return true;
}

/**
 * Checks if there are no duplicate values.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function isUnique<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  if(fc) return isUniqueDual(x, fc, fm);
  else return isUniqueMap(x, fm);
}
export default isUnique;
