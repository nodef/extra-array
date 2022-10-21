import type {reduceFn} from "./_types";

/**
 * Reduces values from right, to a single value.
 * @param x an array
 * @param fr reduce function (acc, v, i, x)
 * @param acc initial value
 */
function reduceRight<T, U=T>(x: T[], fr: reduceFn<T, T|U>, acc?: T|U): T|U {
  var init = arguments.length <= 2;
  for(var i=x.length-1; i>=0; i--) {
    if(init) { acc = x[i]; init = false; }
    else acc = fr(acc, x[i], i, x);
  }
  return acc;
}
export default reduceRight;
