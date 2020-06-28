import is from './is';

/**
 * Gets value at path in a nested array.
 * @param x a nested array
 * @param p path
 */
function getPath(x: any[], p: number[]): any {
  for(var i of p)
    x = is(x)? x[i] : undefined;
  return x;
}
export default getPath;
