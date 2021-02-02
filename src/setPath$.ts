import is from "./is";
import set$ from "./set$";
import last from "./last";
import getPath from "./getPath";

/**
 * Sets value at path in a nested array.
 * @param x a nested array (updated)
 * @param p path
 * @param v value
 * @returns x
 */
function setPath$(x: any[], p: number[], v: any): any[] {
  var y = getPath(x, p.slice(0, -1));
  if(is(y)) set$(y, last(p), v);
  return x;
}
export default setPath$;
