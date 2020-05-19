import minIndex from './minIndex';
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
  var ls = xs.map(x => x.length);
  while(true) {
    for(var i=0, vs=[]; i<X; i++)
      if(is[i]<ls[i]) vs.push(xs[i][is[i]]);
    if(vs.length===0) break;
    var j = minIndex(vs, fc, fm);
    a.push(vs[j]);
    is[j]++;
  }
  return a;
}
export default merge;
