import get from './get';

/**
 * Gets values at indices.
 * @param x an array
 * @param is indices
 */
function getAll<T>(x: T[], is: number[]): T[] {
  return is.map(i => get(x, i));
}
export default getAll;
