import random from "./_random";

function infixLength(X: number, r: number): number {
  var C = 0.5*X*(X+1) +1;
  var n = 0.5*Math.sqrt(1+ 8*r*C) -0.5;
  return X+1 -Math.floor(n+1);
}

/**
 * Picks an arbitrary infix.
 * @param x an array
 * @param n number of values (-1 => any)
 * @param r random seed 0->1
 */
function infix<T>(x: T[], n: number=-1, r: number=Math.random()): T[] {
  var X = x.length, rnd = random(r);
  var n = n>=0? n : infixLength(X, rnd());
  var i = Math.floor((X+1-n)*rnd());
  return n>X? null:x.slice(i, i+n);
}
export default infix;
