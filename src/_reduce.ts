import type {reduceFn} from './_types';

/**
 * Reduces values to a single value.
 * @param x an array
 * @param fr reduce function (acc, v, i, x)
 * @param acc initial value
 */
function reduce<T, U=T>(x: T[], fr: reduceFn<T, T|U>, acc?: T|U): T|U {
  var init = arguments.length <= 2;
  return init? x.reduce(fr as any) : x.reduce(fr as any, acc);
}
export default reduce;
