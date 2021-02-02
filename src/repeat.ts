import concat$ from "./concat$";

/**
 * Repeats an array given times.
 * @param x an array
 * @param n times (1)
 */
function repeat<T>(x: Iterable<T>, n: number=1): T[] {
  for(var a=[]; n>0; n--)
    concat$(a, x);
  return a;
}
export default repeat;
