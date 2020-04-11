import concat$ from './concat$';

/**
 * Repeats an array given times.
 * @param x an array
 * @param n times
 */
function repeat<T>(x: T[], n: number): T[] {
  for(var a=[]; n>0; n--)
    concat$(a, x);
  return a;
}
export default repeat;
