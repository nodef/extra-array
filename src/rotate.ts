import {mod} from "extra-math";
import concat$ from "./concat$";

/**
 * Rotates values in array.
 * @param x an array
 * @param n rotate amount (+ve: left, -ve: right)
 */
function rotate<T>(x: T[], n: number=0): T[] {
  var n = mod(n, x.length);
  return concat$(x.slice(n), x.slice(0, n));
}
export default rotate;
