import is from './is';

/**
 * Checks if nested array has a path.
 * @param x a nested array
 * @param p path
 */
function hasPath(x: any[], p: number[]): boolean {
  for(var i of p) {
    if(!is(x)) return false;
    x = x[i];
  }
  return true;
}
export default hasPath;
