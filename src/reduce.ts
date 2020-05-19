import type {reduceFn} from './_types';

/**
 * Reduces values to a single value.
 * @param x an array
 * @param fn reduce function (acc, v, i, x)
 * @param acc initial value
 */
function reduce<T, U=T>(x: T[], fn: reduceFn<T, T|U>, acc?: T|U): T|U {
  var init = arguments.length <= 2;
  return init? x.reduce(fn as any) : x.reduce(fn as any, acc);
}
export default reduce;
