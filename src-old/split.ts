import type {testFn} from "./_types";

/**
 * Breaks array considering test as separator.
 * @param x an array
 * @param fn test function (v, i, x)
 */
function split<T>(x: Iterable<T>, fn: testFn<T>): T[][] {
  var a = [], b = [], i = -1;
  for(var v of x) {
    if(!fn(v, ++i, x)) b.push(v);
    else if(b.length) { a.push(b); b = []; }
  }
  if(b.length) a.push(b);
  return a;
}
export default split;
