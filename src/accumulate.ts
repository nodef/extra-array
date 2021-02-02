import type {reduceFn} from "./_types";

/**
 * Produces accumulating values.
 * @param x an array
 * @param fr reduce function (acc, v, i, x)
 * @param acc initial value
 */
function accumulate<T, U=T>(x: Iterable<T>, fr: reduceFn<T, T|U>, acc?: T|U): T|U[] {
  var init = arguments.length <= 2;
  var a = [], i = -1;
  for(var v of x) {
    if(init) { acc = v; ++i; init = false; }
    else acc = fr(acc, v, ++i, x);
    a.push(acc);
  }
  return a;
}
export default accumulate;
