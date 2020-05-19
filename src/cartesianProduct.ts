import id from './_id';
import type {mapFn} from './_types';

/**
 * Lists cartesian product of arrays.
 * @param xs arrays
 * @param fn map function (vs, i, xs)
 */
function cartesianProduct<T, U=T>(xs: T[][], fn: mapFn<T[], T[]|U>=null): (T[]|U)[] {
  var fn = fn||id;
  var X = xs.length, a = [];
  if(X===0) return a;
  var is = new Array(X).fill(0);
  var ls = xs.map(x => x.length);
  if(ls.some(l => l===0)) return a;
  for(var i=0;; i++) {
    for(var j=0, vs=[]; j<X; j++)
      vs.push(xs[j][is[j]]);
    a.push(fn(vs, i, null));
    for(var r=X-1; r>=0; r--) {
      if(++is[r]<ls[r]) break;
      is[r] = 0;
    }
    if(r<0) break;
  }
  return a;
}
export default cartesianProduct;
