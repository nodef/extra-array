import id from "./_id";
import some from "./some";
import type {mapFn, tillFn} from "./_types";

/**
 * Combines values from arrays.
 * @param xs arrays
 * @param fm map function (vs, i)
 * @param ft till function (dones) (some)
 * @param vd default value
 */
function zip<T, U=T[]>(xs: T[][], fm: mapFn<T[], T[]|U>=null, ft: tillFn=null, vd?: T): (T[]|U)[] {
  var fm = fm||id, ft = ft||some as tillFn;
  var X = xs.length, a = [];
  if(X===0) return a;
  var ds = new Array(X).fill(false);
  var ls = xs.map(x => x.length);
  for(var i=0;; i++) {
    for(var j=0, vs=[]; j<X; j++) {
      ds[j] = i>=ls[j];
      vs[j] = ds[j]? vd : xs[j][i];
    }
    if(ft(ds)) break;
    a.push(fm(vs, i, null));
  }
  return a;
}
export default zip;
