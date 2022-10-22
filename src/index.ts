import {
  IDENTITY,
  COMPARE,
} from "extra-function";




// TYPES
// =====

/** Entries is a list of key-value pairs, with unique keys (indices). */
export type Entries<T> = Iterable<[number, T]>;


/** Lists is a pair of key list and value list, with unique keys (indices). */
export type Lists<T> = [Iterable<number>, Iterable<T>];


/**
 * Handle reading of a single value.
 * @returns value
 */
 export type ReadFunction<T> = () => T;


/**
 * Handle combining of two values.
 * @param a a value
 * @param b another value
 * @returns combined value
 */
export type CombineFunction<T> = (a: T, b: T) => T;


/**
 * Handle comparison of two values.
 * @param a a value
 * @param b another value
 * @returns a<b: -ve, a=b: 0, a>b: +ve
 */
export type CompareFunction<T> = (a: T, b: T) => number;


/**
 * Handle processing of values in an array.
 * @param v value in array
 * @param i index of value in array
 * @param x array containing the value
 */
export type ProcessFunction<T> = (v: T, i: number, x: T[]) => void;


/**
 * Handle selection of values in an array.
 * @param v value in array
 * @param i index of value in array
 * @param x array containing the value
 * @returns selected?
 */
export type TestFunction<T> = (v: T, i: number, x: T[]) => boolean;


/**
 * Handle transformation of a value to another.
 * @param v value in array
 * @param i index of value in array
 * @param x array containing the value
 * @returns transformed value
 */
export type MapFunction<T, U> = (v: T, i: number, x: T[]) => U;


/**
 * Handle reduction of multiple values into a single value.
 * @param acc accumulator (temporary result)
 * @param v value in array
 * @param i index of value in array
 * @param x array containing the value
 * @returns reduced value
 */
export type ReduceFunction<T, U> = (acc: U, v: T, i: number, x: T[]) => U;


/**
 * Handle ending of a combined array.
 * @param dones iᵗʰ array done?
 * @returns combined array done?
 */
export type EndFunction = (dones: boolean[]) => boolean;




// METHODS
// =======

// HELPERS
// -------

/**
 * Gives a random number generator.
 * @param r random seed 0->1
 */
function random(r: number): getFn<number> {
  var a = Math.floor(r * 2**31);
  return function(): number {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}




// ABOUT
// -----

/**
 * Check if value is an array.
 * @param v a value
 * @returns v is an array?
 */
export function is(v: any): v is any[] {
  return Array.isArray(v);
}


/**
 * List all indices.
 * @param x an array
 * @returns 0, 1, ..., |x|-1
 */
export function keys<T>(x: T[]): IterableIterator<number> {
  return x.keys();
}


/**
 * List all values.
 * @param x an array
 * @returns v₀, v₁, ... | vᵢ = x[i]
 */
export function values<T>(x: T[]): IterableIterator<T> {
  return x.values();
}


/**
 * List all index-value pairs.
 * @param x an array
 * @returns [0, v₀], [1, v₁], ... | vᵢ = x[i]
 */
export function entries<T>(x: T[]): Entries<T> {
  return x.entries();
}




// GENERATE
// --------

/**
 * Convert an iterable to array.
 * @param x an iterable
 * @returns x as array
 */
export function from<T>(x: Iterable<T>): T[] {
  return [...x];
}


/**
 * Convert an iterable to array.
 * @param x an iterable (updatable if array!)
 * @returns x as array
 */
export function from$<T>(x: Iterable<T>): T[] {
  return Array.isArray(x)? x : [...x];
}


/**
 * Generate array from given number range.
 * @param v start number
 * @param V end number, excluding
 * @param dv step size [1]
 * @returns v, v+dv, v+2dv, ...
 */
export function fromRange(v: number, V: number, dv: number=1): number[] {
  if (dv>=0) return fromRangePositive(v, V, dv);
  else       return fromRangeNegative(v, V, dv);
}

function fromRangeNegative(v: number, V: number, dv: number): number[] {
  var a = [];
  for (; v>V; v+=dv)
    a.push(v);
  return a;
}

function fromRangePositive(v: number, V: number, dv: number): number[] {
  var a = [];
  for (; v<V; v+=dv)
    a.push(v);
  return a;
}


// - Should this be included?
// - Then we will be depending on undefined value.
// /**
//  * Generate array from repeated function invocation.
//  * @param fn function (impure)
//  * @param args arguments
//  * @returns fn(...args), fn(...args), ... (until fn(...args) returns nothing)
//  */
// export function fromInvocation<T>(fn: Function, ...args: any[]): T[] {
//   var a = [];
//   for (;;) {
//     var v = fn(...args);
//     if (v===undefined) break;
//     a.push(v);
//   }
//   return a;
// }
// export {fromInvocation as fromCall};


/**
 * Generate array from repeated function application.
 * @param fm map function (v, i)
 * @param v start value
 * @param n number of values
 * @returns [v, fm(v), fm(fm(v)), ...]
 */
export function fromApplication<T>(fm: MapFunction<T, T>, v: T, n: number): T[] {
  var a = [];
  if (n!==0) a.push(v);
  for (var i=1; i!==n; ++i)
    a.push(v = fm(v, i, null));
  return a;
}
export {fromApplication as fromApply};




// COMPARE
// -------

/**
 * Compares two arrays.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x<y: -1, x=y: 0, x>y: 1
 */
export function compare<T, U=T>(x: T[], y: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): number {
  var fc = fc||cmp, fm = fm||id;
  var X = x.length, Y = y.length;
  for(var i=0, I=Math.min(X, Y); i<I; i++) {
    var u1 = fm(x[i], i, x);
    var v1 = fm(y[i], i, y);
    var c = fc(u1, v1);
    if(c!==0) return c;
  }
  return Math.sign(X-Y);
}


/**
 * Checks if two arrays are equal.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function isEqual<T, U=T>(x: T[], y: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  var X = x.length, Y = y.length;
  return X===Y && compare(x, y, fc, fm)===0;
}




// LENGTH
// ------

/**
 * Get zero-based index for element in array.
 * @param x an array
 * @param i index (-ve: from right)
 * @returns i' | x[i'] = x[i]; i'>=0
 */
export function index<T>(x: T[], i: number): number {
  var X = x.length;
  return i>=0? Math.min(i, X-1) : Math.max(X+i, 0);
}


/**
 * Get index range for part of array.
 * @param x an array
 * @param i start index (-ve: from right) [0]
 * @param I end index (-ve: from right) [END]
 * @returns [start_index, end_index]
 */
export function indexRange<T>(x: T[], i: number=0, I: number=x.length): [number, number] {
  var X = x.length;
  var i = i>=0? Math.min(i, X-1) : Math.max(X+i, 0);
  var I = I>=0? Math.min(I, X-1) : Math.max(X+I, 0);
  return [i, Math.max(i, I)];
}


/**
 * Find the length of an array.
 * @param x an array
 * @param i start index [0]
 * @param I end index [X]
 * @returns |x[i..I]|
 */
export function length<T>(x: T[], i: number=0, I: number=x.length): number {
  var [i, I] = indexRange(x, i, I);
  return I-i;
}
export {length as size};


/**
 * Check is an array is empty.
 * @param x an array
 * @returns |x| = 0?
 */
export function isEmpty<T>(x: T[]): boolean {
  return x.length===0;
}




// GET/SET
// -------

/**
 * Gets value at index.
 * @param x an array
 * @param i index (-ve: from right)
 */
export function get<T>(x: T[], i: number): T {
  return x[index(x, i)];
}


/**
 * Gets values at indices.
 * @param x an array
 * @param is indices
 */
export function getAll<T>(x: T[], is: number[]): T[] {
  return is.map(i => get(x, i));
}


/**
 * Gets value at path in a nested array.
 * @param x a nested array
 * @param p path
 */
export function getPath(x: any[], p: number[]): any {
  for(var i of p)
    x = is(x)? x[i] : undefined;
  return x;
}


/**
 * Checks if nested array has a path.
 * @param x a nested array
 * @param p path
 */
export function hasPath(x: any[], p: number[]): boolean {
  for(var i of p) {
    if(!is(x)) return false;
    x = x[i];
  }
  return true;
}


/**
 * Sets value at index.
 * @param x an array (updated)
 * @param i index
 * @param v value
 * @returns x
 */
export function set$<T>(x: T[], i: number, v: T): T[] {
  x[index(x, i)] = v;
  return x;
}


/**
 * Sets value at index.
 * @param x an array
 * @param i index
 * @param v value
 */
export function set<T>(x: T[], i: number, v: T): T[] {
  return set$(x.slice(), i, v);
}


/**
 * Sets value at path in a nested array.
 * @param x a nested array (updated)
 * @param p path
 * @param v value
 * @returns x
 */
export function setPath$(x: any[], p: number[], v: any): any[] {
  var y = getPath(x, p.slice(0, -1));
  if(is(y)) set$(y, last(p), v);
  return x;
}


/**
 * Exchanges two values.
 * @param x an array (updated)
 * @param i an index
 * @param j another index
 * @returns x
 */
export function swap$<T>(x: T[], i: number, j: number): T[] {
  var i = index(x, i), j = index(x, j);
  var t = x[i]; x[i] = x[j]; x[j] = t;
  return x;
}


/**
 * Exchanges two values.
 * @param x an array
 * @param i an index
 * @param j another index
 */
export function swap<T>(x: T[], i: number, j: number): T[] {
  return swap$(x.slice(), i, j);
}


/**
 * Removes value at index.
 * @param x an array (updated)
 * @param i index
 * @returns x
 */
export function remove$<T>(x: T[], i: number): T[] {
  x.splice(i, 1);
  return x;
}


/**
 * Removes value at index.
 * @param x an array
 * @param i index
 */
export function remove<T>(x: T[], i: number): T[] {
  var i = index(x, i);
  return x.slice(0, i).concat(x.slice(i+1));
}


/**
 * Removes value at path in a nested array.
 * @param x a nested array (updated)
 * @param p path
 * @returns x
 */
export function removePath$(x: any[], p: number[]): any[] {
  var y = getPath(x, p.slice(0, -1));
  if(is(y)) y.splice(last(p), 1);
  return x;
}




// PROPERTY
// --------

/**
 * Counts values which satisfy a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
export function count<T>(x: Iterable<T>, ft: testFn<T>): number {
  var a = 0, i = -1;
  for(var v of x)
    if(ft(v, ++i, x)) a++;
  return a;
}


/**
 * Counts occurrences of values.
 * @param x an array
 * @param fm map function (v, i, x)
 * @returns Map {value => count}
 */
export function countAs<T, U=T>(x: Iterable<T>, fm: mapFn<T, T|U>=null): Map<T|U, number> {
  var fm = fm||id;
  var a = new Map(), i = -1;
  for(var v of x) {
    var v1 = fm(v, ++i, x);
    a.set(v1, (a.get(v1)||0) + 1);
  }
  return a;
}


/**
 * Finds smallest value.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns [index, value]
 */
export function min<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): [number, T] {
  return range(x, fc, fm)[0];
}


/**
 * Finds largest entry.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns [index, value]
 */
export function max<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): [number, T] {
  return range(x, fc, fm)[1];
}


/**
 * Finds smallest and largest entries.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns [smallest, largest]
 */
export function range<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): [[number, T], [number, T]] {
  var fc = fc||cmp, fm = fm||id;
  var mi = -1, mu: T, mv: T|U;
  var ni = -1, nu: T, nv: T|U;
  var i = -1;
  for(var u of x) {
    var v = fm(u, ++i, x);
    if(i===0 || fc(v, mv)<0) { mi = i; mu = u; mv = v; }
    if(i===0 || fc(v, nv)>0) { ni = i; nu = u; nv = v; }
  }
  return [[mi, mu], [ni, nu]];
}




// PART
// ----

/**
 * Gets a part of array.
 * @param x an array (updated)
 * @param i start index (0)
 * @param I end index (X)
 * @returns x
 */
export function slice$<T>(x: T[], i: number=0, I: number=x.length): T[] {
  x.copyWithin(0, i, I);
  x.length = size(x, i, I);
  return x;
}


/**
 * Gets a part of array.
 * @param x an array
 * @param i start index (0)
 * @param I end index (X)
 */
export function slice<T>(x: T[], i: number=0, I: number=x.length): T[] {
  return x.slice(i, I);
}


/**
 * Gets first value.
 * @param x an array
 * @param vd default value
 */
export function head<T>(x: T[], vd?: T): T {
  return x.length>0? x[0] : vd;
}


/**
 * Gets last value.
 * @param x an array
 * @param vd default value
 */
export function last<T>(x: T[], vd?: T): T {
  return x.length>0? x[x.length-1] : vd;
}


/**
 * Gets values except first.
 * @param x an array
 */
export function tail<T>(x: T[]): T[] {
  return x.slice(1);
}


/**
 * Gets values except last.
 * @param x an array
 */
export function init<T>(x: T[]): T[] {
  return x.slice(0, -1);
}


/**
 * Gets values from left.
 * @param x an array
 * @param n number of values (1)
 */
export function left<T>(x: T[], n: number=1): T[] {
  return x.slice(0, n);
}


/**
 * Gets values from right.
 * @param x an array
 * @param n number of values (1)
 */
export function right<T>(x: T[], n: number=1): T[] {
  return x.slice(x.length-n);
}


/**
 * Gets values from middle.
 * @param x an array
 * @param i start index (0)
 * @param n number of values (1)
 */
export function middle<T>(x: T[], i: number=0, n: number=1): T[] {
  return x.slice(i, i+n);
}


/**
 * Keeps first n values only.
 * @param x an array
 * @param n number of values (1)
 */
export function take<T>(x: T[], n: number=1): T[] {
  return x.slice(0, n);
}


/**
 * Keeps last n values only.
 * @param x an array
 * @param n number of values (1)
 */
export function takeRight<T>(x: T[], n: number=1): T[] {
  return x.slice(x.length-n);
}


/**
 * Keeps values from left, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 */
export function takeWhile<T>(x: T[], ft: testFn<T>): T[] {
  return x.slice(0, scanWhile(x, ft));
}


/**
 * Keeps values from right, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 */
export function takeWhileRight<T>(x: T[], ft: testFn<T>): T[] {
  return x.slice(scanWhileRight(x, ft));
}


/**
 * Discards first n values only.
 * @param x an array
 * @param n number of values (1)
 */
export function drop<T>(x: T[], n: number=1): T[] {
  return x.slice(n);
}


/**
 * Discards last n values only.
 * @param x an array
 * @param n number of values (1)
 */
export function dropRight<T>(x: T[], n: number=1): T[] {
  return x.slice(0, x.length-n);
}


/**
 * Discards values from left, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 */
export function dropWhile<T>(x: T[], ft: testFn<T>): T[] {
  return x.slice(scanUntil(x, ft));
}


/**
 * Discards values from right, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 */
export function dropWhileRight<T>(x: T[], ft: testFn<T>): T[] {
  return x.slice(0, scanUntilRight(x, ft));
}


/**
 * Picks an arbitrary value.
 * @param x an array
 * @param r random seed 0->1
 */
export function value<T>(x: T[], r: number=Math.random()): T {
  var i = Math.floor(r * x.length);
  return x[i];
}


/**
 * Picks an arbitrary prefix.
 * @param x an array
 * @param n number of values (-1 => any)
 * @param r random seed 0->1
 */
export function prefix<T>(x: T[], n: number=-1, r: number=Math.random()): T[] {
  var X = x.length, rnd = random(r);
  var n = n>=0? n:Math.floor((X+1)*rnd());
  return n>X? null:x.slice(0, n);
}


/**
 * Lists all possible prefixes.
 * @param x an array
 * @param n number of values (-1 => any)
 */
export function* prefixes<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  if(n>=0) { yield x.slice(0, n); return; }
  for(var i=0, I=x.length; i<=I; i++)
    yield x.slice(0, i);
}


/**
 * Picks an arbitrary suffix.
 * @param x an array
 * @param n number of values (-1 => any)
 * @param r random seed 0->1
 */
export function suffix<T>(x: T[], n: number=-1, r: number=Math.random()): T[] {
  var X = x.length, rnd = random(r);
  var n = n>=0? n:Math.floor((X+1)*rnd());
  return n>X? null:x.slice(-n);
}


/**
 * Lists all possible suffixes.
 * @param x an array
 * @param n number of values (-1 => any)
 */
export function* suffixes<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  if(n>=0) { yield x.slice(x.length-n); return; }
  for(var i=0, I=x.length; i<=I; i++)
    yield x.slice(i);
}


/**
 * Picks an arbitrary infix.
 * @param x an array
 * @param n number of values (-1 => any)
 * @param r random seed 0->1
 */
export function infix<T>(x: T[], n: number=-1, r: number=Math.random()): T[] {
  var X = x.length, rnd = random(r);
  var n = n>=0? n : infixLength(X, rnd());
  var i = Math.floor((X+1-n)*rnd());
  return n>X? null:x.slice(i, i+n);
}

function infixLength(X: number, r: number): number {
  var C = 0.5*X*(X+1) +1;
  var n = 0.5*Math.sqrt(1+ 8*r*C) -0.5;
  return X+1 -Math.floor(n+1);
}


/**
 * Lists all possible infixes.
 * @param x an array
 * @param n number of values (-1 => any)
 */
export function* infixes<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  if(n<=0) { yield []; if(n===0) return; }
  var X = x.length, N = Math.max(n, 1), dj = n<0? 1:X;
  for(var i=0, I=X-N+1; i<I; i++) {
    for(var j=i+N; j<=X; j+=dj)
      yield x.slice(i, j);
  }
}

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
export function subsequence<T>(x: T[], n: number=-1, r: number=Math.random()): T[] {
  var X = x.length;
  if(n>=0) return n>X? null:subsequenceNum(x, n, r);
  return subsequenceAny(x, r);
}


/**
 * Lists all possible subsequences.
 * @param x an array
 * @param n number of values (-1 => any)
 */
export function* subsequences<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  var X = x.length;
  if(n>=X) { if(n===X) yield x; return; }
  if(n===0 || X===0) { yield []; return; }
  var y = x.slice(0, -1);
  yield* subsequences(y, n);
  for(var s of subsequences(y, n-1)) {
    s.push(x[X-1]);
    yield s;
  }
}


/**
 * Picks an arbitrary permutation.
 * @param x an array
 * @param n number of values (-1 => any)
 * @param r random seed 0->1
 */
export function permutation<T>(x: T[], n: number=-1, r: number=Math.random()): T[] {
  if(n>x.length) return null;
  return permutation$(x.slice(), n, r);
}


/**
 * Picks an arbitrary permutation.
 * @param x an array (updated)
 * @param n number of values (-1 => any)
 * @param r random seed 0->1
 * @returns x
 */
export function permutation$<T>(x: T[], n: number=-1, r: number=Math.random()): T[] {
  if(n>x.length) return x;
  var X = x.length, rnd = random(r);
  var n = n>=0? n:Math.floor((X+1)*rnd());
  for(var i=0; i<n; i++) {
    var j = i+Math.floor((X-i)*rnd());
    var t = x[i]; x[i] = x[j]; x[j] = t;
  }
  x.length = n;
  return x;
}


/**
 * Lists all possible permutations.
 * @param x an array
 * @param n number of values (-1 => any)
 */
export function* permutations<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  var X = x.length;
  if(n>X) return;
  for(var i=n<0? 0:n, I=n<0? X:n; i<=I; i++)
    yield* permutationsOf(x, i);
}

function* permutationsOf<T>(x: T[], n: number): IterableIterator<T[]> {
  var X = x.length;
  if(X===0 || n===0) { yield []; return; }
  for(var i=0; i<X; i++) {
    var y = splice(x, i, 1);
    for(var p of permutationsOf(y, n-1))
      yield [x[i], ...p];
  }
}




// FIND
// ----

/**
 * Checks if array has a value.
 * @param x an array
 * @param v search value
 * @param i start index (0)
 */
export function includes<T>(x: T[], v: T, i: number=0): boolean {
  return x.includes(v, i);
}


/**
 * Finds first index of a value.
 * @param x an array
 * @param v search value
 * @param i start index (0)
 */
export function indexOf<T>(x: T[], v: T, i: number=0): number {
  return x.indexOf(v, i);
}


/**
 * Finds last index of a value.
 * @param x an array
 * @param v search value
 * @param i start index (X-1)
 */
export function lastIndexOf<T>(x: T[], v: T, i: number=x.length-1) {
  return x.lastIndexOf(v, i);
}


/**
 * Finds first value passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
export function find<T>(x: T[], ft: testFn<T>): T {
  return x.find(ft);
}


/**
 * Finds last value passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
export function findRight<T>(x: T[], ft: testFn<T>): T {
  for(var i=x.length-1; i>=0; i--)
    if(ft(x[i], i, x)) return x[i];
}


/**
 * Finds all values passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
export function findAll<T>(x: T[], ft: testFn<T>): T[] {
  return x.filter(ft);
}


/**
 * Scans from left, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns index where test fails
 */
export function scanWhile<T>(x: Iterable<T>, ft: testFn<T>): number {
  var i = -1;
  for(var v of x)
    if(!ft(v, ++i, x)) return i;
  return ++i;
}


/**
 * Scans from right, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns first index where test passes till end
 */
export function scanWhileRight<T>(x: T[], ft: testFn<T>): number {
  for(var i=x.length-1; i>=0; i--)
    if(!ft(x[i], i, x)) break;
  return i+1;
}


/**
 * Scans from left, until a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns index where test passes
 */
export function scanUntil<T>(x: Iterable<T>, ft: testFn<T>): number {
  var i = -1;
  for(var v of x)
    if(ft(v, ++i, x)) return i;
  return ++i;
}


/**
 * Scans from right, until a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns first index where test fails till end
 */
export function scanUntilRight<T>(x: T[], ft: testFn<T>): number {
  for(var i=x.length-1; i>=0; i--)
    if(ft(x[i], i, x)) break;
  return i+1;
}


/**
 * Finds index of first value passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns index of value, -1 if not found
 */
export function search<T>(x: T[], ft: testFn<T>): number {
  return x.findIndex(ft);
}


/**
 * Finds index of last value passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns index of value, -1 if not found
 */
export function searchRight<T>(x: T[], ft: testFn<T>): number {
  for(var i=x.length-1; i>=0; i--)
    if(ft(x[i], i, x)) return i;
  return -1;
}


/**
 * Finds indices of values passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
export function searchAll<T>(x: Iterable<T>, ft: testFn<T>): number[] {
  var a = [], i = -1;
  for(var v of x)
    if(ft(v, ++i, x)) a.push(i);
  return a;
}


/**
 * Finds first index of a value.
 * @param x an array
 * @param v search value
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns index of value, -1 if not found
 */
export function searchValue<T, U=T>(x: Iterable<T>, v: T, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): number {
  var fc = fc||cmp, fm = fm||id;
  var v1 = fm(v, 0, null), i = -1;
  for(var u of x) {
    var u1 = fm(u, ++i, x);
    if(fc(u1, v1)===0) return i;
  }
  return -1;
}


/**
 * Finds last index of a value.
 * @param x an array
 * @param v search value
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns index of value, -1 if not found
 */
export function searchValueRight<T, U=T>(x: T[], v: T, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): number {
  var fc = fc||cmp, fm = fm||id;
  var v1 = fm(v, 0, null);
  for(var i=x.length-1; i>=0; i--) {
    var u1 = fm(x[i], i, x);
    if(fc(u1, v1)===0) return i;
  }
  return -1;
}


/**
 * Finds indices of value.
 * @param x an array
 * @param v search value
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function searchValueAll<T, U=T>(x: Iterable<T>, v: T, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): number[] {
  var fc = fc||cmp, fm = fm||id;
  var v1 = fm(v, 0, null);
  var a = [], i = -1;
  for(var u of x) {
    var u1 = fm(u, ++i, x);
    if(fc(u1, v1)===0) a.push(i);
  }
  return a;
}


import {searchInfix as iterableSearchInfix} from "extra-iterable";

/**
 * Finds first index of an infix.
 * @param x an array
 * @param y search infix
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function searchInfix<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): number {
  return iterableSearchInfix(x, y, fc, fm);
}


import {searchInfixRight as iterableSearchInfixRight} from "extra-iterable";

/**
 * Finds last index of an infix.
 * @param x an array
 * @param y search infix
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function searchInfixRight<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): number {
  return iterableSearchInfixRight(x, y, fc, fm);
}


import {searchInfixAll as iterableSearchInfixAll} from "extra-iterable";

/**
 * Finds indices of an infix.
 * @param x an array
 * @param y search infix
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function searchInfixAll<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): number[] {
  return [...iterableSearchInfixAll(x, y, fc, fm)];
}


/**
 * Finds first index of a subsequence.
 * @param x an array
 * @param y subsequence?
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function searchSubsequence<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): number {
  var fc = fc||cmp, fm = fm||id
  var y1 = [...y].map(fm), Y = y1.length;
  var a = -1, i = -1, j = 0;
  for(var u of x) {
    var u1 = fm(u, ++i, x);
    if(fc(u1, y1[j])!==0) continue;
    if(a<0) a = i;
    if(++j>=Y) return a;
  }
  return -1;
}


/**
 * Checks if array has a value.
 * @param x an array
 * @param v value?
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function hasValue<T, U=T>(x: Iterable<T>, v: T, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  return searchValue(x, v, fc, fm) >= 0;
}


/**
 * Checks if array starts with a prefix.
 * @param x an array
 * @param y prefix?
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function hasPrefix<T, U=T>(x: T[], y: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  var Y = y.length;
  return Y===0 || compare(x.slice(0, Y), y, fc, fm)===0;
}


/**
 * Checks if array ends with a suffix.
 * @param x an array
 * @param y suffix?
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function hasSuffix<T, U=T>(x: T[], y: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  var Y = y.length;
  return Y===0 || compare(x.slice(-Y), y, fc, fm)===0;
}


import {hasInfix as iterableHasInfix} from "extra-iterable";

/**
 * Checks if array contains an infix.
 * @param x an array
 * @param y infix?
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function hasInfix<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  return iterableHasInfix(x, y, fc, fm);
}


/**
 * Checks if array has a subsequence.
 * @param x an array
 * @param y subsequence?
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function hasSubsequence<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  return searchSubsequence(x, y, fc, fm)>=0;
}


/**
 * Checks if array has a permutation.
 * @param x an array
 * @param y permutation?
 * @param fc map function (v, i, x)
 * @param fm compare function (a, b)
 */
export function hasPermutation<T, U=T>(x: T[], y: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  var x1 = fm? x.map(fm) : x.slice();
  var y1 = fm? y.map(fm) : y.slice();
  return hasSubsequence(x1.sort(), y1.sort(), fc, fm);
}




// FUNCTIONAL
// ----------

/**
 * Calls a function for each value.
 * @param x an array
 * @param fc called function (v, i, x)
 */
export function forEach<T>(x: T[], fc: calledFn<T>): void {
  x.forEach(fc);
}


/**
 * Checks if any value satisfies a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
export function some<T>(x: T[], ft: testFn<T>=null): boolean {
  if(ft) return x.some(ft);
  else return someBool(x);
}

function someBool<T>(x: T[]): boolean {
  for(var i=0, I=x.length; i<I; i++)
    if(x[i]) return true;
  return false;
}


/**
 * Checks if all values satisfy a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
export function every<T>(x: T[], ft: testFn<T>=null): boolean {
  if(ft) return x.every(ft);
  else return everyBool(x);
}

function everyBool<T>(x: T[]): boolean {
  for(var i=0, I=x.length; i<I; i++)
    if(!x[i]) return false;
  return true;
}


/**
 * Updates values based on map function.
 * @param x an array (updated)
 * @param fm map function (v, i, x)
 * @returns x
 */
export function map$<T>(x: T[], fm: mapFn<T, T>): T[] {
  for(var i=0, I=x.length; i<I; i++)
    x[i] = fm(x[i], i, x);
  return x;
}


/**
 * Updates values based on map function.
 * @param x an array
 * @param fm map function (v, i, x)
 */
export function map<T, U=T>(x: T[], fm: mapFn<T, T|U>): (T|U)[] {
  return x.map(fm);
}


/**
 * Reduces values to a single value.
 * @param x an array
 * @param fr reduce function (acc, v, i, x)
 * @param acc initial value
 */
export function reduce<T, U=T>(x: T[], fr: reduceFn<T, T|U>, acc?: T|U): T|U {
  var init = arguments.length <= 2;
  return init? x.reduce(fr as any) : x.reduce(fr, acc);
}


/**
 * Reduces values from right, to a single value.
 * @param x an array
 * @param fr reduce function (acc, v, i, x)
 * @param acc initial value
 */
export function reduceRight<T, U=T>(x: T[], fr: reduceFn<T, T|U>, acc?: T|U): T|U {
  var init = arguments.length <= 2;
  for(var i=x.length-1; i>=0; i--) {
    if(init) { acc = x[i]; init = false; }
    else acc = fr(acc, x[i], i, x);
  }
  return acc;
}


/**
 * Keeps values which pass a test.
 * @param x an array (updated)
 * @param ft test function (v, i, x)
 * @returns x
 */
export function filter$<T>(x: T[], ft: testFn<T>): T[] {
  for(var i=0, j=0, I=x.length; i<I; i++)
    if(ft(x[i], i, x)) x[j++] = x[i];
  x.length = j;
  return x;
}


/**
 * Keeps values which pass a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
export function filter<T>(x: T[], ft: testFn<T>): T[] {
  return x.filter(ft);
}


/**
 * Keeps values at given indices only.
 * @param x an array (updated)
 * @param is indices (sorted)
 * @returns x
 */
export function filterAt<T>(x: T[], is: number[]): T[] {
  var X = x.length, a = [];
  for(var i of is)
    if(i>=0 && i<X) a.push(x[i]);
  return a;
}


/**
 * Discards values which pass a test.
 * @param x an array (updated)
 * @param ft test function (v, i, x)
 * @returns x
 */
export function reject$<T>(x: T[], ft: testFn<T>): T[] {
  for(var i=0, j=0, I=x.length; i<I; i++)
    if(!ft(x[i], i, x)) x[j++] = x[i];
  x.length = j;
  return x;
}


/**
 * Discards values which pass a test.
 * @param x an array
 * @param ft test function (v, i, x)
 */
export function reject<T>(x: Iterable<T>, ft: testFn<T>): T[] {
  var a = [], i = -1;
  for(var v of x)
    if(!ft(v, ++i, x)) a.push(v);
  return a;
}


/**
 * Discards values at given indices.
 * @param x an array
 * @param is indices
 */
export function rejectAt<T>(x: Iterable<T>, is: number[]): T[] {
  var a = [], i = -1;
  for(var v of a)
    if(!is.includes(++i)) a.push(v);
  return a;
}


/**
 * Produces accumulating values.
 * @param x an array
 * @param fr reduce function (acc, v, i, x)
 * @param acc initial value
 */
export function accumulate<T, U=T>(x: Iterable<T>, fr: reduceFn<T, T|U>, acc?: T|U): T|U[] {
  var init = arguments.length <= 2;
  var a = [], i = -1;
  for(var v of x) {
    if(init) { acc = v; ++i; init = false; }
    else acc = fr(acc, v, ++i, x);
    a.push(acc);
  }
  return a;
}


/**
 * Flattens nested array to given depth.
 * @param x a nested array
 * @param n maximum depth (-1 => all)
 * @param fm map function (v, i, x)
 * @param ft test function (v, i, x)
 */
export function flat(x: Iterable<any>, n: number=-1, fm: mapFn<any, any>=null, ft: testFn<any>=null): any[] {
  var fm = fm||id, ft = ft||is;
  return flatTo(x, n, fm, ft, []);
}

function flatTo(x: Iterable<any>, n: number, fm: mapFn<any, any>, ft: testFn<any>, a: any[]): any[] {
  var i = -1;
  for(var v of x) {
    var v1 = fm(v, ++i, x);
    if(n!==0 && ft(v1, i, x)) flatTo(v, n-1, fm, ft, a);
    else a.push(v1);
  }
  return a;
}


/**
 * Flattens nested array, based on map function.
 * @param x an array
 * @param fm map function (v, i, x)
 * @param ft test function (v, i, x)
 */
export function flatMap(x: Iterable<any>, fm: mapFn<any, any>=null, ft: testFn<any>=null): any[] {
  var fm = fm||id, ft = ft||is;
  var a = [], i = -1;
  for(var v of x) {
    var v1 = fm(v, ++i, x);
    if(ft(v1, i, x)) concat$(a, v1);
    else a.push(v1);
  }
  return a;
}


/**
 * Combines values from arrays.
 * @param xs arrays
 * @param fm map function (vs, i)
 * @param ft till function (dones) (some)
 * @param vd default value
 */
export function zip<T, U=T[]>(xs: T[][], fm: mapFn<T[], T[]|U>=null, ft: tillFn=null, vd?: T): (T[]|U)[] {
  var fm = fm||id, ft = ft||some as tillFn;
  var X = xs.length, a = [];
  if(X===0) return a;
  var ds = new Array(X).fill(false);
  var ls = xs.map(x => x.length);
  for(var i=0;; i++) {
    for(var j=0, vs=[]; j<X; j++) {
      ds[j] = i>=ls[j];
      vs[j] = ds[j]? vd : xs[j][i];
    }
    if(ft(ds)) break;
    a.push(fm(vs, i, null));
  }
  return a;
}




// MANIPULATION
// ------------

/**
 * Fills with given value.
 * @param x an array (updated)
 * @param v value
 * @param i start index (0)
 * @param I end index (X)
 * @returns x
 */
export function fill$<T>(x: T[], v: T, i: number=0, I: number=x.length): T[] {
  return x.fill(v, i, I);
}


/**
 * Fills with given value.
 * @param x an array
 * @param v value
 * @param i start index (0)
 * @param I end index (X)
 */
export function fill<T>(x: T[], v: T, i: number=0, I: number=x.length): T[] {
  return x.slice().fill(v, i, I);
}


/**
 * Arranges values in an order.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function sort<T, U=T>(x: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  return sort$(x.slice(), fc, fm);
}


/**
 * Arranges values in an order.
 * @param x an array (updated)
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x
 */
export function sort$<T, U=T>(x: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  var fc = fc||cmp;
  if(fm) return sortDual$(x, fc, fm);
  else return x.sort(fc);
}

function sortDual$<T, U=T>(x: T[], fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  var fc = fc||cmp, fm = fm||id;
  var m = new Map(), i = -1;
  for(var v of x)
    m.set(v, fm(v, ++i, x));
  return x.sort((a, b) => cmp(m.get(a), m.get(b)));
}


/**
 * Adds values to the end.
 * @param x an array (updated)
 * @param vs values to add
 * @returns x
 */
export function push$<T>(x: T[], ...vs: T[]): T[] {
  x.push(...vs);
  return x;
}


/**
 * Adds values to the end.
 * @param x an array
 * @param vs values to add
 */
export function push<T>(x: T[], ...vs: T[]): T[] {
  return x.concat(vs);
}


/**
 * Removes last value.
 * @param x an array
 */
export function pop<T>(x: T[]): T[] {
  return x.slice(0, -1);
}


/**
 * Removes last value.
 * @param x an array (updated)
 */
export function pop$<T>(x: T[]): T[] {
  x.pop();
  return x;
}


/**
 * Removes first value.
 * @param x an array
 */
export function shift<T>(x: T[]): T[] {
  return x.slice(1);
}


/**
 * Removes first value.
 * @param x an array (updated)
 * @returns x
 */
export function shift$<T>(x: T[]): T[] {
  x.shift();
  return x;
}


/**
 * Adds values to the start.
 * @param x an array (updated)
 * @param vs values to add
 * @returns x
 */
export function unshift$<T>(x: T[], ...vs: T[]): T[] {
  x.unshift(...vs);
  return x;
}


/**
 * Adds values to the start.
 * @param x an array
 * @param vs values to add
 */
export function unshift<T>(x: Iterable<T>, ...vs: T[]): T[] {
  return concat$(vs, x);
}


/**
 * Copies part of array to another.
 * @param x target array (updated)
 * @param y source array
 * @param j write index (0)
 * @param i read start index (0)
 * @param I read end index (X)
 * @returns x
 */
export function copy$<T>(x: T[], y: T[], j: number=0, i: number=0, I: number=y.length): T[] {
  var j = index(x, j);
  var [i, I] = indexRange(y, i, I);
  for(; i<I; i++, j++)
    x[j] = y[i];
  return x;
}


/**
 * Copies part of array to another.
 * @param x target array
 * @param y source array
 * @param j write index (0)
 * @param i read start index (0)
 * @param I read end index (X)
 */
export function copy<T>(x: T[], y: T[], j: number=0, i: number=0, I: number=y.length): T[] {
  return copy$(x.slice(), y, j, i, I);
}


/**
 * Copies part of array within.
 * @param x an array (updated)
 * @param j write index (0)
 * @param i read start index (0)
 * @param I read end index (X)
 * @returns x
 */
export function copyWithin$<T>(x: T[], j: number=0, i: number=0, I: number=x.length): T[] {
  return x.copyWithin(j, i, I);
}


/**
 * Copies part of array within.
 * @param x an array
 * @param j write index (0)
 * @param i read start index (0)
 * @param I read end index (X)
 */
export function copyWithin<T>(x: T[], j: number=0, i: number=0, I: number=x.length): T[] {
  var I = i + Math.min(size(x, i, I), size(x, j));
  var p = x.slice(0, j);
  var q = x.slice(i, I);
  var r = x.slice(j+q.length);
  return p.concat(q, r);
}


/**
 * Moves part of array within.
 * @param x an array (updated)
 * @param j write index (0)
 * @param i read start index (0)
 * @param I read end index (X)
 * @returns x
 */
export function moveWithin$<T>(x: T[], j: number=0, i: number=0, I: number=x.length): T[] {
  var p = x.slice(i, I), P = p.length;
  if(j<i) x.copyWithin(j+P, j, i);
  else x.copyWithin(i, I, j);
  return copy$(x, p, j<i? j : j-P);
}


/**
 * Moves part of array within.
 * @param x an array
 * @param j write index (0)
 * @param i read start index (0)
 * @param I read end index (X)
 */
export function moveWithin<T>(x: T[], j: number=0, i: number=0, I: number=x.length): T[] {
  if(j<i) return movePart(x, j, i, I);
  else return movePart(x, i, I, j);
}

function movePart<T>(x: T[], i: number, j: number, k: number): T[] {
  return x.slice(0, i).concat(
    x.slice(j, k),
    x.slice(i, j),
    x.slice(k)
  );
}


/**
 * Removes or replaces existing values.
 * @param x an array (updated)
 * @param i remove index
 * @param n number of values to remove (rest)
 * @param vs values to insert
 */
export function splice$<T>(x: T[], i: number, n: number=x.length-i, ...vs: T[]): T[] {
  x.splice(i, n, ...vs);
  return x;
}


/**
 * Removes or replaces existing values.
 * @param x an array
 * @param i remove index
 * @param n number of values to remove (rest)
 * @param vs values to insert
 */
export function splice<T>(x: T[], i: number, n: number=x.length-i, ...vs: T[]): T[] {
  return concat$(x.slice(0, i), vs, x.slice(i+n));
}


/**
 * Breaks array considering test as separator.
 * @param x an array
 * @param fn test function (v, i, x)
 */
export function split<T>(x: Iterable<T>, fn: testFn<T>): T[][] {
  var a = [], b = [], i = -1;
  for(var v of x) {
    if(!fn(v, ++i, x)) b.push(v);
    else if(b.length) { a.push(b); b = []; }
  }
  if(b.length) a.push(b);
  return a;
}


/**
 * Breaks iterable considering indices as separator.
 * @param x an array
 * @param is indices (sorted)
 */
export function splitAt<T>(x: Iterable<T>, is: number[]): T[][] {
  var a = [], b = [], i = -1;
  for(var v of x) {
    if(!is.includes(++i)) b.push(v);
    else if(b.length) { a.push(b); b = []; }
  }
  if(b.length) a.push(b);
  return a;
}


/**
 * Breaks array when test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 */
export function cut<T>(x: T[], ft: testFn<T>): T[][] {
  var a = [], j = 0;
  for(var i=0, I=x.length; i<I; i++) {
    if(!ft(x[i], i, x)) continue;
    a.push(x.slice(j, i));
    j = i;
  }
  a.push(x.slice(j));
  return a;
}


/**
 * Breaks array after test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 */
export function cutRight<T>(x: T[], ft: testFn<T>): T[][] {
  var a = [], j = 0;
  for(var i=0, I=x.length; i<I; i++) {
    if(!ft(x[i], i, x)) continue;
    a.push(x.slice(j, i+1));
    j = i+1;
  }
  a.push(x.slice(j));
  return a;
}


/**
 * Breaks array at given indices.
 * @param x an array
 * @param is split indices (sorted)
 */
export function cutAt<T>(x: T[], is: number[]): T[][] {
  var a = [], j = 0;
  for(var i of is) {
    i = Math.max(j, index(x, i));
    a.push(x.slice(j, i));
    j = i;
  }
  a.push(x.slice(i));
  return a;
}


/**
 * Breaks array after given indices.
 * @param x an array
 * @param is split indices (sorted)
 */
export function cutAtRight<T>(x: T[], is: number[]): T[][] {
  return cutAt(x, is.map(i => i+1));
}


/**
 * Breaks array keeping similar values together.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function group<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[][] {
  var fc = fc||cmp, fm = fm||id;
  var a = [], b = [];
  var u1: T|U, i = -1;
  for(var v of x) {
    var v1 = fm(v, ++i, x);
    if(i===0 || fc(u1, v1)===0) b.push(v);
    else { a.push(b); b = [v]; }
    u1 = v1;
  }
  a.push(b);
  return a;
}


/**
 * Segregates values by test result.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns [satisfies, doesnt]
 */
export function partition<T>(x: Iterable<T>, ft: testFn<T>): [T[], T[]] {
  var t: T[] = [], f: T[] = [], i = -1;
  for(var v of x) {
    if(ft(v, ++i, x)) t.push(v);
    else f.push(v);
  }
  return [t, f];
}


/**
 * Segregates values by similarity.
 * @param x an array
 * @param fm map function (v, i, x)
 * @returns Map {key => values}
 */
export function partitionAs<T, U=T>(x: Iterable<T>, fm: mapFn<T, T|U>=null): Map<T|U, T[]> {
  var fm = fm||id;
  var a = new Map(), i = -1;
  for(var v of x) {
    var v1 = fm(v, ++i, x);
    if(!a.has(v1)) a.set(v1, []);
    a.get(v1).push(v);
  }
  return a;
}


/**
 * Breaks array into chunks of given size.
 * @param x an array
 * @param n chunk size (1)
 * @param s chunk step (n)
 */
export function chunk<T>(x: T[], n: number=1, s: number=n): T[][] {
  var a = [];
  for(var i=0, I=x.length; i<I; i+=s)
    a.push(x.slice(i, i+n));
  return a;
}


/**
 * Gives values that cycle through array.
 * @param x an array
 * @param i start index (0)
 * @param n number of values (X)
 */
export function cycle<T>(x: T[], i: number=0, n: number=x.length): T[] {
  var X = x.length;
  if(n<=0 || X===0) return [];
  var i = index(x, i);
  var a = x.slice(i, i+n);
  n -= a.length;
  for(var m=0, M=Math.floor(n/X); m<M; m++)
    concat$(a, x);
  return concat$(a, x.slice(0, n % X));
}


/**
 * Repeats an array given times.
 * @param x an array
 * @param n times (1)
 */
export function repeat<T>(x: Iterable<T>, n: number=1): T[] {
  for(var a=[]; n>0; n--)
    concat$(a, x);
  return a;
}


/**
 * Reverses the array.
 * @param x an array (updated)
 * @returns x
 */
export function reverse$<T>(x: T[]): T[] {
  return x.reverse();
}


/**
 * Reverses the array.
 * @param x an array
 */
export function reverse<T>(x: T[]): T[] {
  return x.slice().reverse();
}


import {mod} from "extra-math";

/**
 * Rotates values in array.
 * @param x an array (updated)
 * @param n rotate amount (+ve: left, -ve: right)
 * @returns x
 */
export function rotate$<T>(x: T[], n: number=0): T[] {
  var n = mod(n, x.length);
  var y = x.slice(0, n);
  x.copyWithin(0, n);
  return copy$(x, y, x.length-n);
}


import {mod} from "extra-math";

/**
 * Rotates values in array.
 * @param x an array
 * @param n rotate amount (+ve: left, -ve: right)
 */
export function rotate<T>(x: T[], n: number=0): T[] {
  var n = mod(n, x.length);
  return concat$(x.slice(n), x.slice(0, n));
}


/**
 * Places a separator between every value.
 * @param x an array
 * @param v separator
 */
export function intersperse<T>(x: Iterable<T>, v: T): T[] {
  var a=[], i = -1;
  for(var u of x) {
    if(++i>0) a.push(v);
    a.push(u);
  }
  return a;
}


/**
 * Estimates new values between existing ones.
 * @param x an array
 * @param fc combine function (a, b)
 */
export function interpolate<T>(x: Iterable<T>, fc: combineFn<T>): T[] {
  var a = [], u: T, i = -1;
  for(var v of x) {
    if(++i>0) a.push(fc(u, v));
    a.push(u = v);
  }
  return a;
}


/**
 * Places values of an array between another.
 * @param x an array
 * @param y another array
 * @param m number of values from x (1)
 * @param n number of values from y (1)
 * @param s step size for x (m)
 * @param t step size for y (n)
 */
export function intermix<T>(x: T[], y: T[], m: number=1, n: number=1, s: number=m, t: number=n): T[] {
  var X = x.length, Y = y.length, a = [];
  for(var i=0, j=0; i<X; i+=s) {
    if(i>0) { for(var k=j, K=k+n; k<K; k++) a.push(y[k % Y]); j += t; }
    concat$(a, x.slice(i, i+m));
  }
  return a;
}


/**
 * Merges values from arrays.
 * @param xs arrays
 */
export function interleave<T>(xs: T[][]): T[] {
  var a = [];
  for(var i=0;; i++) {
    var n = 0;
    for(var x of xs)
      if(i<x.length) { a.push(x[i]); n++; }
    if(n===0) break;
  }
  return a;
}




// COMBINE
// -------

/**
 * Appends values from arrays.
 * @param x an array (updated)
 * @param ys arrays to append
 * @returns x
 */
export function concat$<T>(x: T[], ...ys: Iterable<T>[]): T[] {
  for(var y of ys)
    x.push(...y);
  return x;
}


/**
 * Appends values from arrays.
 * @param xs arrays
 */
export function concat<T>(...xs: Iterable<T>[]): T[] {
  return concat$([], ...xs);
}


/**
 * Joins values together.
 * @param x an array
 * @param sep separator (,)
 */
export function join<T>(x: T[], sep: string=","): string {
  return x.join(sep);
}




// SET OPERATIONS
// --------------

/**
 * Checks if there are no duplicate values.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function isUnique<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  if(fc) return isUniqueDual(x, fc, fm);
  else return isUniqueMap(x, fm);
}

function isUniqueMap<T, U=T>(x: Iterable<T>, fm: mapFn<T, T|U>=null): boolean {
  var fm = fm||id;
  var s = new Set(), i = -1;
  for(var v of x) {
    var v1 = fm(v, ++i, x);
    if(s.has(v1)) return false;
    s.add(v1);
  }
  return true;
}

function isUniqueDual<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  var fc = fc||cmp, fm = fm||id;
  var x1 = [...x].map(fm);
  for(var u1 of x1) {
    for(var v1 of x1)
      if(fc(u1, v1)===0) return false;
  }
  return true;
}


import {from as setFrom} from "extra-set";

/**
 * Checks if arrays have no value in common.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function isDisjoint<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  if(fc) return isDisjointDual(x, y, fc, fm);
  return isDisjointMap(x, y, fm);
}

function isDisjointMap<T, U=T>(x: Iterable<T>, y: Iterable<T>, fm: mapFn<T, T|U>=null): boolean {
  var s = setFrom(y, fm);
  var fm = fm||id, i = -1;
  for(var u of x) {
    var u1 = fm(u, ++i, x);
    if(s.has(u1)) return false;
  }
  return true;
}

function isDisjointDual<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): boolean {
  var fc = fc||cmp, fm = fm||id;
  var y1 = [...y].map(fm), i = -1;
  for(var u of x) {
    var u1 = fm(u, ++i, x);
    for(var v1 of y1)
      if(fc(u1, v1)===0) return false;
  }
  return true;
}


/**
 * Removes duplicate values.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function unique<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  if(fc) return uniqueDual(x, fc, fm);
  else return uniqueMap(x, fm);
}

function uniqueMap<T, U=T>(x: Iterable<T>, fn: mapFn<T, T|U>=null): T[] {
  var fn = fn||id;
  var s = new Set();
  var a = [], i = -1;
  for(var v of x) {
    var v1 = fn(v, ++i, x);
    if(s.has(v1)) continue;
    s.add(v1); a.push(v);
  }
  return a;
}

function uniqueDual<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  var fc=fc||cmp, fm = fm||id;
  var s = [], a = [], i = -1;
  x: for(var v of x) {
    var v1 = fm(v, ++i, x);
    for(var u1 of s)
      if(fc(u1, v1)===0) continue x;
    s.push(v1); a.push(v);
  }
  return a;
}


import {from as setFrom} from "extra-set";

/**
 * Gives values present in any array.
 * @param x an array (updated)
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x
 */
export function union$<T, U=T>(x: T[], y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  if(fc) return unionDual$(x, y, fc, fm);
  else return unionMap$(x, y, fm);
}

function unionMap$<T, U=T>(x: T[], y: Iterable<T>, fm: mapFn<T, T|U>=null): T[] {
  var s = setFrom(x, fm);
  var fm = fm||id, i = -1;
  for(var v of y) {
    var v1 = fm(v, ++i, y);
    if(!s.has(v1)) x.push(v);
  }
  return x;
}

function unionDual$<T, U=T>(x: T[], y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  var fc = fc||cmp, fm = fm||id;
  var x1 = x.map(fm), j = -1;
  y: for(var v of y) {
    var v1 = fm(v, ++j, y);
    for(var u1 of x1)
      if(fc(u1, v1)===0) continue y;
    x.push(v);
  }
  return x;
}


/**
 * Gives values present in any array.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function union<T, U=T>(x: T[], y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  return union$(x.slice(), y, fc, fm);
}


import {from as setFrom} from "extra-set";

/**
 * Gives values present in both arrays.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function intersection<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  if(fc) return intersectionDual(x, y, fc, fm);
  else return intersectionMap(x, y, fm);
}

function intersectionMap<T, U=T>(x: Iterable<T>, y: Iterable<T>, fm: mapFn<T, T|U>=null): T[] {
  var s = setFrom(y, fm);
  var fm = fm||id;
  var a = [], i = -1;
  for(var u of x) {
    var u1 = fm(u, ++i, x);
    if(s.has(u1)) a.push(u);
  }
  return a;
}

function intersectionDual<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  var fc = fc||cmp, fm = fm||id;
  var y1 = [...y].map(fm);
  var a = [], i = -1;
  x: for(var u of x) {
    var u1 = fm(u, ++i, x);
    for(var v1 of y1)
      if(fc(u1, v1)===0) { a.push(u); continue x; }
  }
  return a;
}




import {from as setFrom} from "extra-set";

/**
 * Gives values of array not present in another.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function difference<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  if(fc) return differenceDual(x, y, fc, fm);
  else return differenceMap(x, y, fm);
}

function differenceMap<T, U=T>(x: Iterable<T>, y: Iterable<T>, fm: mapFn<T, T|U>=null): T[] {
  var s = setFrom(y, fm);
  var fm = fm||id;
  var a = [], i = -1;
  for(var u of x) {
    var u1 = fm(u, ++i, x);
    if(!s.has(u1)) a.push(u);
  }
  return a;
}

function differenceDual<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): T[] {
  var fc = fc||cmp, fm = fm||id;
  var y1 = [...y].map(fm);
  var a = [], i = -1;
  x: for(var u of x) {
    var u1 = fm(u, ++i, x), j = -1;
    for(var v1 of y1)
      if(fc(u1, v1)===0) continue x;
    a.push(u);
  }
  return a;
}


/**
 * Gives values not present in both arrays.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function symmetricDifference<T, U=T>(x: Iterable<T>, y: Iterable<T>, fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  var x0 = from$(x), y0 = from$(y);
  var ax = difference(x0, y0, fc, fm);
  var ay = difference(y0, x0, fc, fm);
  return concat$(ax, ay);
}


/**
 * Lists cartesian product of arrays. TODO
 * @param xs arrays
 * @param fm map function (vs, i)
 */
export function cartesianProduct<T, U=T>(xs: T[][], fm: MapFunction<T[], T[]|U> | null=null): (T[]|U)[] {
  var fm = fm || IDENTITY;
  var X  = xs.length, a = [];
  if (X===0) return a;
  var is = new Array(X).fill(0);
  var ls = xs.map(x => x.length);
  if (ls.some(l => l===0)) return a;
  for (var i=0;; i++) {
    for (var j=0, vs=[]; j<X; j++)
      vs.push(xs[j][is[j]]);
    a.push(fm(vs, i, null));
    for (var r=X-1; r>=0; r--) {
      if (++is[r]<ls[r]) break;
      is[r] = 0;
    }
    if (r<0) break;
  }
  return a;
}
