import type {reduceFn} from './_types';

/**
 * Reduces values to a single value, from right.
 * @param x an array
 * @param fr reduce function (acc, v, i, x)
 * @param acc initial value
 */
function reduceRight<T, U=T>(x: T[], fr: reduceFn<T, T|U>, acc?: T|U): T|U {
  var init = arguments.length <= 2;
  return init? x.reduceRight(fr as any) : x.reduceRight(fr as any, acc);
}
export default reduceRight;
