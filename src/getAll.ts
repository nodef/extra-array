import get from './get';

/**
 * Gets values at indices.
 * @param x an array
 * @param is indices (-ve: from right)
 */
function getAll<T>(x: T[], is: Iterable<number>): T[] {
  var a = [];
  for(var i of is)
    a.push(get(x, i));
  return a;
}
export default getAll;
