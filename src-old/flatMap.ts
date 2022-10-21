import id from "./_id";
import is from "./is";
import concat$ from "./concat$";
import type {mapFn, testFn} from "./_types";

/**
 * Flattens nested array, based on map function.
 * @param x an array
 * @param fm map function (v, i, x)
 * @param ft test function (v, i, x)
 */
function flatMap(x: Iterable<any>, fm: mapFn<any, any>=null, ft: testFn<any>=null): any[] {
  var fm = fm||id, ft = ft||is;
  var a = [], i = -1;
  for(var v of x) {
    var v1 = fm(v, ++i, x);
    if(ft(v1, i, x)) concat$(a, v1);
    else a.push(v1);
  }
  return a;
}
export default flatMap;
