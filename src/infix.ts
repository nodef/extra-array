import random from './_random';

/**
 * Picks an arbitrary infix.
 * @param x an array
 * @param n number of values (-1 => any)
 * @param r random seed 0->1
 */
function infix<T>(x: T[], n: number=-1, r: number=Math.random()): T[] {
  var X = x.length, rnd = random(r);
  var n = n>=0? n:Math.floor((X+1)*rnd());
  var i = Math.floor((X+1-n)*rnd());
  return n>X? null:x.slice(i, i+n);
}
export default infix;
