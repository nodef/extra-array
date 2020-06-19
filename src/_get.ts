import index from './index!';

/**
 * Gets value at index.
 * @param x an array
 * @param i index (-ve: from right)
 */
function get<T>(x: T[], i: number): T {
  return x[index(x, i)];
}
export default get;
