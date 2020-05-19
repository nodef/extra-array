import map from '@extra-iterable/map';
import cut from './cut';

/**
 * Breaks array after given indices.
 * @param x an array
 * @param is split indices (sorted)
 */
function cutRight<T>(x: T[], is: Iterable<number>): T[][] {
  return cut(x, map(is, i => i+1));
}
export default cutRight;
