import id from './_id';
import cmp from './_cmp';
import type {compareFn, mapFn} from './_types';

function* uniqueMap<T, U=T>(x: Iterable<T>, fn: mapFn<T, T|U>=null): IterableIterator<T> {
  var fn = fn||id;
  var us = new Set(), i = -1;
  for(var v of x) {
    var v1 = fn(v, ++i, x);
    if(us.has(v1)) continue;
    us.add(v1); yield v;
  }
}

function* uniqueDual<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): IterableIterator<T> {
  var fc=fc||cmp, fm = fm||id;
  var us = [], i = -1;
  x: for(var v of x) {
    var v1 = fm(v, ++i, x);
    for(var u1 of us)
      if(fc(u1, v1)===0) continue x;
    us.push(v1); yield v;
  }
}

/**
 * Removes duplicate values.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function* unique<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): IterableIterator<T> {
  if(fc) yield* uniqueDual(x, fc, fm);
  else yield* uniqueMap(x, fm);
}
export default unique;
