import min from './min';
import type {compareFn, mapFn} from './_types';

/**
 * Merges values from sorted iterables.
 * @param xs iterables
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function merge<T, U=T>(xs: T[][], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  var X = xs.length, a = [];
  if(X===0) return a;
  var is = new Array(X).fill(0);
  var xs = xs.filter(x => x.length>0);
  while(xs.length>0) {
    for(var i=0, I=xs.length, vs=[]; i<I; i++)
      vs[i] = xs[i][is[i]];
    var i = min(vs, fc, fm)[0];
    a.push(vs[i]);
    if(++is[i]<xs[i].length) continue;
    xs.splice(i, 1);
    is.splice(i, 1);
  }
  return a;
}
export default merge;
