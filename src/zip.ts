import some from './some';
import id from './_id';
import type {mapFn, tillFn} from './_types';

/**
 * Combines values from arrays.
 * @param xs arrays
 * @param fm map function (vs, i, xs)
 * @param ft till function (dones) (some)
 * @param vd default value
 */
function zip<T, U=T[]>(xs: T[][], fm: mapFn<T[], T[]|U>=null, ft: tillFn=null, vd?: T): (T[]|U)[] {
  var fm = fm||id, ft = ft||some as tillFn;
  var X = xs.length;
  if(X===0) return;
  var R = xs.length, a = [];
  var C = Math.min(...xs.map(x => x.length));
  for(var c=0; c<C; c++) {
    for(var r=0, vs=[]; r<R; r++)
      vs.push(xs[r][c]);
    a.push(fm(vs, c, xs));
  }
  return a;
}
export default zip;
