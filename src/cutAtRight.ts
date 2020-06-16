import cutAt from './cutAt';

/**
 * Breaks array after given indices.
 * @param x an array
 * @param is split indices (sorted)
 */
function cutAtRight<T>(x: T[], is: number[]): T[][] {
  return cutAt(x, is.map(i => i+1));
}
export default cutAtRight;
