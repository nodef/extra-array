import type {reduceFn} from './_types';

/**
 * Produces accumulating values.
 * @param x an array (updated)
 * @param fn reduce function (acc, v, i, x)
 * @param acc initial value
 * @returns x
 */
function accumulate$<T>(x: T[], fn: reduceFn<T, T>, acc?: T): T[] {
  var init = arguments.length <= 2;
  for(var i=0, I=x.length; i<I; i++) {
    if(init) { init = false; acc = x[i]; }
    else acc = fn(acc, x[i], i, x);
    x[i] = acc;
  }
  return x;
}
export default accumulate$;
