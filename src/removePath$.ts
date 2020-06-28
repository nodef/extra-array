import is from './is';
import last from './last';
import getPath from './getPath';

/**
 * Removes value at path in a nested array.
 * @param x a nested array (updated)
 * @param p path
 * @returns x
 */
function removePath$(x: any[], p: number[]): any[] {
  var y = getPath(x, p.slice(-1));
  if(is(y)) y.splice(last(p), 1);
  return x;
}
export default removePath$;
