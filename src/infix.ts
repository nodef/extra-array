import random from './_random';

function infixLength(X, r) {
  var C = 0.5*X*(X+1) +1;
  var c = r*C;
  var n = 0.5*Math.sqrt(1+ 8*r*C) -0.5;
  var x = X+1-Math.floor(n+1)
  console.log(c.toFixed(2), ':', n.toFixed(2), ':', x);
  return X+1-Math.floor(n+1);
}

function infixLength(X, r) {
  var C = 0.5*X*(X+1) + 1;
  var c = Math.floor(r*C);
  var n = Math.sqrt(1+ 8*c)*0.5 - 0.5;
  var x = n===0? 0 : X+1-Math.ceil(n);
  console.log(c.toFixed(2), ':', n.toFixed(2), ':', x);
  return X+1-Math.ceil(n);
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
