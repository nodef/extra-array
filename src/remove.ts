import index from './index!';

/**
 * Removes value at index.
 * @param x an array
 * @param i index
 */
function remove<T>(x: T[], i: number): T[] {
  var i = index(x, i);
  return x.slice(0, i).concat(x.slice(i+1));
}
export default remove;
