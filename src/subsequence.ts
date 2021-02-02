import permutation$ from "./permutation$";
import fromRange from "./fromRange";
import getAll from "./getAll";
import random from "./_random";

function subsequenceNum<T>(x: T[], n: number, r: number): T[] {
  var is = fromRange(0, x.length, 1);
  permutation$(is, n, r).sort();
  return getAll(x, is);
}

function subsequenceAny<T>(x: T[], r: number): T[] {
  var rnd = random(r), a = [];
  for(var v of x)
    if(rnd()>=0.5) a.push(v);
  return a;
}

/**
 * Picks an arbitrary subsequence.
 * @param x an array
 * @param n number of values (-1 => any)
 * @param r random seed 0->1
 */
function subsequence<T>(x: T[], n: number=-1, r: number=Math.random()): T[] {
  var X = x.length;
  if(n>=0) return n>X? null:subsequenceNum(x, n, r);
  return subsequenceAny(x, r);
}
export default subsequence;
