import {
  mod,
} from "extra-math";
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
export type TestEndFunction = (dones: boolean[]) => boolean;




// METHODS
// =======

// HELPERS
// -------

// Convert an array to set, using a map function.
function toSet<T, U>(x: T[], fm: MapFunction<T, U>): Set<U> {
  var a = new Set<U>();
  for (var i=0, I=x.length; i<I; ++i)
    a.add(fm(x[i], i, x));
  return a;
}


// Find indices of an infix as a list.
function* searchInfixAllList<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): IterableIterator<number> {
  var fc = fc || COMPARE;
  var fm = fm || IDENTITY;
  var y1 = [...map(y, fm)];
  var Y  = y1.length;
  if (Y===0) { yield* fromRange(0, x.length); return; }
  var m  = new Array(Y).fill(false);
  var i  = -1, J = 0;
  for (var vx of x) {
    var wx = fm(vx, ++i, x);
    for (var j=J; j>0; --j)
      m[j] = m[j-1] && fc(wx, y1[j])===0;
    m[0] = fc(wx, y1[0])===0;
    J = Math.min(J+1, Y-1);
    if (m[Y-1]) yield i-Y+1;
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
 * @returns [v, v+dv, v+2dv, ...]
 */
export function fromRange(v: number, V: number, dv: number=1): number[] {
  var n = (V - v)/dv, a = [];
  for (var i=0; i<n; ++i, v+=dv)
    a.push(v);
  return a;
}


/**
 * Generate array from repeated function invocation.
 * @param fn function
 * @param n number of values
 * @returns [fn(), fn(), ...]
 */
export function fromInvocation<T>(fn: Function, n: number): T[] {
  var a = [];
  for (var i=0; i<n; ++i)
    a.push(fn());
  return a;
}
export {fromInvocation as fromCall};


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
 * Compare two arrays (lexicographically).
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x<y: -ve, x=y: 0, x>y: +ve
 */
export function compare<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number {
  var fc = fc || COMPARE;
  var fm = fm || IDENTITY;
  var X  = x.length;
  var Y  = y.length;
  for (var i=0, I=Math.min(X, Y); i<I; ++i) {
    var wx = fm(x[i], i, x);
    var wy = fm(y[i], i, y);
    var c  = fc(wx, wy);
    if (c!==0) return c;
  }
  return Math.sign(X-Y);
}


/**
 * Check if two arrays are equal.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x = y?
 */
export function isEqual<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  var X = x.length, Y = y.length;
  return X===Y && compare(x, y, fc, fm)===0;
}




// LENGTH
// ------

/**
 * Get zero-based index for element in array.
 * @param x an array
 * @param i index (-ve: from right)
 * @returns i' | x[i'] = x[i]; i' ∈ [0, |x|)
 */
export function index<T>(x: T[], i: number): number {
  var X = x.length;
  return i>=0? Math.min(i, X-1) : Math.max(X+i, 0);
}


/**
 * Get index range for part of array.
 * @param x an array
 * @param i start index (-ve: from right) [0]
 * @param I end index (-ve: from right) [|x|]
 * @returns [i', I'] | i' ≤ I'; i', I' ∈ [0, |x|)
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
 * Check if an array is empty.
 * @param x an array
 * @returns |x| = 0?
 */
export function isEmpty<T>(x: T[]): boolean {
  return x.length===0;
}




// GET/SET
// -------

/**
 * Get value at index.
 * @param x an array
 * @param i index
 * @returns x[i]
 */
export function get<T>(x: T[], i: number): T {
  return x[index(x, i)];
}


/**
 * Get values at indices.
 * @param x an array
 * @param is indices
 * @returns [x[i₀], x[i₁], ...] | [i₀, i₁, ...] = is
 */
export function getAll<T>(x: T[], is: number[]): T[] {
  return is.map(i => get(x, i));
}


/**
 * Get value at path in a nested array.
 * @param x a nested array
 * @param p path
 * @returns x[i₀][i₁][...] | [i₀, i₁, ...] = p
 */
export function getPath(x: any[], p: number[]): any {
  for (var i of p)
    x = is(x)? get(x, i) : undefined;
  return x;
}


/**
 * Check if nested array has a path.
 * @param x a nested array
 * @param p path
 * @returns x[i₀][i₁][...] exists? | [i₀, i₁, ...] = p
 */
export function hasPath(x: any[], p: number[]): boolean {
  for (var i of p) {
    if (!is(x)) return false;
    x = get(x, i);
  }
  return true;
}


/**
 * Set value at index.
 * @param x an array
 * @param i index
 * @param v value
 * @returns x' | x' = x; x'[i] = v
 */
export function set<T>(x: T[], i: number, v: T): T[] {
  return set$(x.slice(), i, v);
}


/**
 * Set value at index.
 * @param x an array (updated)
 * @param i index
 * @param v value
 * @returns x | x[i] = v
 */
export function set$<T>(x: T[], i: number, v: T): T[] {
  x[index(x, i)] = v;
  return x;
}


/**
 * Set value at path in a nested array.
 * @param x a nested array (updated)
 * @param p path
 * @param v value
 * @returns x | x[i₀][i₁][...] = v; [i₀, i₁, ...] = p
 */
export function setPath$(x: any[], p: number[], v: any): any[] {
  var y = getPath(x, p.slice(0, -1));
  if (is(y)) set$(y, last(p), v);
  return x;
}


/**
 * Exchange two values.
 * @param x an array
 * @param i an index
 * @param j another index
 * @returns x' | x' = x; x'[i] = x[j]; x'[j] = x[i]
 */
export function swap<T>(x: T[], i: number, j: number): T[] {
  return swap$(x.slice(), i, j);
}


/**
 * Exchange two values.
 * @param x an array (updated)
 * @param i an index
 * @param j another index
 * @returns x | x[i] ↔ x[j]
 */
export function swap$<T>(x: T[], i: number, j: number): T[] {
  var i = index(x, i), j = index(x, j);
  var t = x[i]; x[i] = x[j]; x[j] = t;
  return x;
}


/**
 * Remove value at index.
 * @param x an array
 * @param i index
 * @returns x[0..i] ⧺ x[i+1..]
 */
export function remove<T>(x: T[], i: number): T[] {
  var i = index(x, i);
  return x.slice(0, i).concat(x.slice(i+1));
}


/**
 * Remove value at index.
 * @param x an array (updated)
 * @param i index
 * @returns x \\: [i]
 */
export function remove$<T>(x: T[], i: number): T[] {
  x.splice(i, 1);
  return x;
}


/**
 * Remove value at path in a nested array.
 * @param x a nested array (updated)
 * @param p path
 * @returns x \\: [i₀][i₁][...] | [i₀, i₁, ...] = p
 */
export function removePath$(x: any[], p: number[]): any[] {
  var y = getPath(x, p.slice(0, -1));
  if (is(y)) y.splice(last(p), 1);
  return x;
}




// PROPERTY
// --------

/**
 * Count values which satisfy a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns Σtᵢ | tᵢ = 1 if ft(vᵢ) else 0; vᵢ ∈ x
 */
export function count<T>(x: T[], ft: TestFunction<T>): number {
  var i = -1, a = 0;
  for (var v of x)
    if (ft(v, ++i, x)) ++a;
  return a;
}


/**
 * Count occurrences of values.
 * @param x an array
 * @param fm map function (v, i, x)
 * @returns Map \{value ⇒ count\}
 */
export function countAs<T, U=T>(x: T[], fm: MapFunction<T, T|U> | null=null): Map<T|U, number> {
  var fm = fm || IDENTITY;
  var i  = -1, a = new Map();
  for (var v of x) {
    var w = fm(v, ++i, x);
    a.set(w, (a.get(w) || 0) + 1);
  }
  return a;
}


/**
 * Find smallest value.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns v | v ≤ vᵢ; vᵢ ∈ x
 */
export function min<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T {
  return rangeEntries(x, fc, fm)[0][1];
}


/**
 * Find smallest entry.
 * @param x an iterable
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns [min_index, min_value]
 */
export function minEntry<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): [number, T] {
  return rangeEntries(x, fc, fm)[0];
}


/**
 * Find largest value.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns v | v ≥ vᵢ; vᵢ ∈ x
 */
export function max<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T {
  return rangeEntries(x, fc, fm)[1][1];
}


/**
 * Find largest entry.
 * @param x an iterable
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns [max_index, max_value]
 */
export function maxEntry<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): [number, T] {
  return rangeEntries(x, fc, fm)[1];
}


/**
 * Find smallest and largest values.
 * @param x an iterable
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns [min_value, max_value]
 */
export function range<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): [T, T] {
  var [a, b] = rangeEntries(x, fc, fm);
  return [a[1], b[1]];
}


/**
 * Find smallest and largest entries.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns [min_entry, max_entry]
 */
export function rangeEntries<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): [[number, T], [number, T]] {
  var fc = fc || COMPARE;
  var fm = fm || IDENTITY;
  var X  = x.length;
  if (X===0) return [[-1, undefined], [-1, undefined]];
  var v  = x[0], w = fm(v, 0, x);
  var mi = 0, mv = v, mw = w;
  var ni = 0, nv = v, nw = w;
  for (var i=1; i<X; ++i) {
    var v = x[i], w = fm(v, i, x);
    if (fc(w, mw)<0) { mi = i; mv = v; mw = w; }
    if (fc(w, nw)>0) { ni = i; nv = v; nw = w; }
  }
  return [[mi, mv], [ni, nv]];
}




// PART
// ----

/**
 * Get part of an array.
 * @param x an array
 * @param i start index [0]
 * @param I end index [|x|]
 * @returns x[i..I]
 */
export function slice<T>(x: T[], i: number=0, I: number=x.length): T[] {
  return x.slice(i, I);
}


/**
 * Get part of an array.
 * @param x an array (updated)
 * @param i start index [0]
 * @param I end index [|x|]
 * @returns x = x[i..I]
 */
export function slice$<T>(x: T[], i: number=0, I: number=x.length): T[] {
  x.copyWithin(0, i, I);
  x.length = length(x, i, I);
  return x;
}


/**
 * Get first value.
 * @param x an array
 * @param vd default value
 * @returns x[0] || vd
 */
export function head<T>(x: T[], vd?: T): T {
  return x.length>0? x[0] : vd;
}


/**
 * Get last value.
 * @param x an array
 * @param vd default value
 * @returns x[|x|-1] || vd
 */
export function last<T>(x: T[], vd?: T): T {
  return x.length>0? x[x.length-1] : vd;
}


/**
 * Get values except first.
 * @param x an array
 * @returns x[1..|x|]
 */
export function tail<T>(x: T[]): T[] {
  return x.slice(1);
}


/**
 * Get values except last.
 * @param x an array
 * @returns x[0..|x|-1]
 */
export function init<T>(x: T[]): T[] {
  return x.slice(0, -1);
}


/**
 * Get values from middle.
 * @param x an array
 * @param i start index
 * @param n number of values [1]
 * @returns x[i..i+n]
 */
export function middle<T>(x: T[], i: number, n: number=1): T[] {
  return x.slice(i, i+n);
}


/**
 * Keep first n values only.
 * @param x an array
 * @param n number of values [1]
 * @returns x[0..n]
 */
export function take<T>(x: T[], n: number=1): T[] {
  return x.slice(0, n);
}
export {take as left};


/**
 * Keep last n values only.
 * @param x an array
 * @param n number of values [1]
 * @returns x[0..n]
 */
export function takeRight<T>(x: T[], n: number=1): T[] {
  return x.slice(x.length-n);
}
export {takeRight as right};


/**
 * Keep values from left, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns x[0..T-1] | ft(x[i]) = true ∀ i ∈ [0, T-1] & ft(x[T]) = false
 */
export function takeWhile<T>(x: T[], ft: TestFunction<T>): T[] {
  return x.slice(0, scanWhile(x, ft));
}


/**
 * Keep values from right, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns x[T..] | ft(x[i]) = true ∀ i ∈ [T, |x|-1] & ft(x[T-1]) = false
 */
export function takeWhileRight<T>(x: T[], ft: TestFunction<T>): T[] {
  return x.slice(scanWhileRight(x, ft));
}


/**
 * Discard first n values only.
 * @param x an array
 * @param n number of values [1]
 * @returns x[n..]
 */
export function drop<T>(x: T[], n: number=1): T[] {
  return x.slice(n);
}


/**
 * Discard last n values only.
 * @param x an array
 * @param n number of values [1]
 * @returns x[0..-n]
 */
export function dropRight<T>(x: T[], n: number=1): T[] {
  return x.slice(0, x.length-n);
}


/**
 * Discard values from left, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns x[T..] | ft(x[i]) = true ∀ i ∈ [0, T-1] & ft(x[T]) = false
 */
export function dropWhile<T>(x: T[], ft: TestFunction<T>): T[] {
  return x.slice(scanUntil(x, ft));
}


/**
 * Discard values from right, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns x[0..T-1] | ft(x[i]) = true ∀ i ∈ [T, |x|-1] & ft(x[T-1]) = false
 */
export function dropWhileRight<T>(x: T[], ft: TestFunction<T>): T[] {
  return x.slice(0, scanUntilRight(x, ft));
}




// ARRANGEMENTS
// ------------

/**
 * List all possible prefixes.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @returns [], x[..1], x[..2], ... if n<0; x[..n] otherwise
 */
export function* prefixes<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  var X = x.length;
  if (n>X)  return;
  if (n>=0) { yield x.slice(0, n); return; }
  for (var i=0; i<=X; ++i)
    yield x.slice(0, i);
}


/**
 * List all possible suffixes.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @returns x[0..], x[1..], x[2..], ... if n<0; x[-n..] otherwise
 */
export function* suffixes<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  var X = x.length;
  if (n>X)  return;
  if (n>=0) { yield x.slice(x.length - n); return; }
  for (var i=0; i<=X; ++i)
    yield x.slice(i);
}


/**
 * List all possible infixes.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @returns [], x[0..1], x[0..2], ..., x[1..2], ... if n<0; only of length n otherwise
 */
export function infixes<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  if (n>=0) return infixesFixed(x, n);
  else      return infixesAll(x);
}

function* infixesFixed<T>(x: T[], n: number): IterableIterator<T[]> {
  var X = x.length;
  if (n>X)   return;
  if (n===0) { yield []; return; }
  for (var i=0, I=X-n+1; i<I; ++i)
    yield x.slice(i, i+n);
}

function* infixesAll<T>(x: T[]): IterableIterator<T[]> {
  var X = x.length; yield [];
  for (var i=0; i<X; ++i) {
    for (var j=i+1; j<=X; ++j)
      yield x.slice(i, j);
  }
}


/**
 * List all possible subsequences.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @returns elements selected by bit from 0..2^|x| if n<0; only of length n otherwise
 */
export function* subsequences<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  var X = x.length;
  if (n>X) return;
  if (n===X)          { yield x;  return; }
  if (n===0 || X===0) { yield []; return; }
  var y = x.slice(0, -1);
  yield* subsequences(y, n);
  for (var s of subsequences(y, n-1)) {
    s.push(x[X-1]);
    yield s;
  }
}


/**
 * List all possible permutations.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @returns [], arrangements of length 1, of length 2, ... if n<0; only of length n otherwise
 */
export function* permutations<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  var X = x.length;
  if (n>X) return;
  var i = n<0? 0 : n;
  var I = n<0? X : n
  for (; i<=I; ++i)
    yield* permutationsFixed(x, i);
}

function* permutationsFixed<T>(x: T[], n: number): IterableIterator<T[]> {
  var X = x.length;
  if (X===0 || n===0) { yield []; return; }
  for (var i=0; i<X; ++i) {
    var y = splice(x, i, 1);
    for (var p of permutationsFixed(y, n-1))
      yield [x[i], ...p];
  }
}


/**
 * Pick an arbitrary value.
 * @param x an array
 * @param fr random number generator ([0, 1))
 * @returns x[i] | i ∈ 0..|x|
 */
export function randomValue<T>(x: T[], fr: ReadFunction<number> | null=Math.random): T {
  var i = Math.floor(fr() * x.length);
  return x[i];
}
export {randomValue as value};  // DEPRECATED


/**
 * Pick an arbitrary prefix.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @param fr random number generator ([0, 1))
 * @returns x[..i] if n<0; x[..n] otherwise | i ∈ 0..|x|
 */
export function randomPrefix<T>(x: T[], n: number=-1, fr: ReadFunction<number> | null=Math.random): T[] {
  var X = x.length;
  if (n>X) return null;
  var n = n>=0? n : Math.floor((X+1)*fr());
  return x.slice(0, n);
}
export {randomPrefix as prefix};  // DEPRECATED


/**
 * Pick an arbitrary suffix.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @param fr random number generator ([0, 1))
 * @returns x[|x|-i..] if n<0; x[|x|-n..] otherwise | i ∈ 0..|x|
 */
export function randomSuffix<T>(x: T[], n: number=-1, fr: ReadFunction<number> | null=Math.random): T[] {
  var X = x.length;
  if (n>X) return null;
  var n = n>=0? n : Math.floor((X+1)*fr());
  return x.slice(X-n);
}
export {randomSuffix as suffix};  // DEPRECATED


/**
 * Pick an arbitrary infix.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @param fr random number generator ([0, 1))
 * @returns x[i..j] if n<0; x[i..i+n] otherwise | i, j ∈ 0..|x|
 */
export function randomInfix<T>(x: T[], n: number=-1, fr: ReadFunction<number> | null=Math.random): T[] {
  var X = x.length;
  if (n>X) return null;
  var n = n>=0? n : randomInfixLength(X, fr());
  var i = Math.floor((X+1-n)*fr());
  return x.slice(i, i+n);
}
export {randomInfix as infix};  // DEPRECATED

// Not all infix lengths are equally proable.
function randomInfixLength(X: number, r: number): number {
  var C = 0.5 * X*(X+1) + 1;
  var n = 0.5 * Math.sqrt(1 + 8*r*C) - 0.5;
  return X+1  - Math.floor(n+1);
}


/**
 * Pick an arbitrary subsequence.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @param fr random number generator ([0, 1))
 * @returns x[i, j, ...] | [i, j, ...] = is; |is| = |x| if n<0 else n
 */
export function randomSubsequence<T>(x: T[], n: number=-1, fr: ReadFunction<number> | null=Math.random): T[] {
  var X = x.length;
  if (n>X)  return null;
  if (n>=0) return randomSubsequenceFixed(x, n, fr);
  else      return randomSubsequenceAll(x, fr);
}
export {randomSubsequence as subsequence};  // DEPRECATED

function randomSubsequenceFixed<T>(x: T[], n: number, fr: ReadFunction<number>): T[] {
  var is = fromRange(0, x.length);
  randomPermutation$(is, n, fr).sort();
  return getAll(x, is);
}

function randomSubsequenceAll<T>(x: T[], fr: ReadFunction<number>): T[] {
  var a = [];
  for (var v of x)
    if (fr()<0.5) a.push(v);
  return a;
}


/**
 * Pick an arbitrary permutation.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @param fr random number generator ([0, 1))
 * @returns x' | x' = x; values are randomly shuffled
 */
export function randomPermutation<T>(x: T[], n: number=-1, fr: ReadFunction<number> | null=Math.random): T[] {
  var X = x.length;
  if (n>X) return null;
  return randomPermutation$(x.slice(), n, fr);
}
export {randomPermutation as permutation};  // DEPRECATED


/**
 * Pick an arbitrary permutation.
 * @param x an array (updated)
 * @param n number of values [-1 ⇒ any]
 * @param fr random number generator ([0, 1))
 * @returns x | values are randomly shuffled
 */
export function randomPermutation$<T>(x: T[], n: number=-1, fr: ReadFunction<number> | null=Math.random): T[] {
  var X = x.length;
  if (n>X) return x;
  var n = n>=0? n : Math.floor((X+1)*fr());
  for (var i=0; i<n; ++i) {
    var j = i + Math.floor((X-i)*fr());
    var t = x[i]; x[i] = x[j]; x[j] = t;
  }
  x.length = n;
  return x;
}
export {randomPermutation$ as permutation$};  // DEPRECATED
export {randomPermutation$ as permute$};
export {randomPermutation$ as shuffle$};




// FIND
// ----

/**
 * Check if array has a value.
 * @param x an array
 * @param v search value
 * @param i start index [0]
 * @returns v ∈ x[i..]?
 */
export function includes<T>(x: T[], v: T, i: number=0): boolean {
  return x.includes(v, i);
}


/**
 * Find first index of a value.
 * @param x an array
 * @param v search value
 * @param i start index [0]
 * @returns index of v in x[i..] if found else -1
 */
export function indexOf<T>(x: T[], v: T, i: number=0): number {
  return x.indexOf(v, i);
}


/**
 * Find last index of a value.
 * @param x an array
 * @param v search value
 * @param i start index [|x|-1]
 * @returns last index of v in x[0..i] if found else -1
 */
export function lastIndexOf<T>(x: T[], v: T, i: number=x.length-1) {
  return x.lastIndexOf(v, i);
}


/**
 * Find first value passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns first v | ft(v) = true; v ∈ x
 */
export function find<T>(x: T[], ft: TestFunction<T>): T {
  return x.find(ft);
}


/**
 * Find last value passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns last v | ft(v) = true; v ∈ x
 */
export function findRight<T>(x: T[], ft: TestFunction<T>): T {
  for (var i=x.length-1; i>=0; --i)
    if (ft(x[i], i, x)) return x[i];
}


/**
 * Scan from left, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns first index where test fails
 */
export function scanWhile<T>(x: T[], ft: TestFunction<T>): number {
  var i = -1;
  for (var v of x)
    if (!ft(v, ++i, x)) return i;
  return ++i;
}


/**
 * Scan from right, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns first index where test passes till end
 */
export function scanWhileRight<T>(x: T[], ft: TestFunction<T>): number {
  for (var i=x.length-1; i>=0; --i)
    if (!ft(x[i], i, x)) break;
  return ++i;
}


/**
 * Scan from left, until a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns first index where test passes
 */
export function scanUntil<T>(x: T[], ft: TestFunction<T>): number {
  var i = -1;
  for (var v of x)
    if (ft(v, ++i, x)) return i;
  return ++i;
}


/**
 * Scan from right, until a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns first index where test fails till end
 */
export function scanUntilRight<T>(x: T[], ft: TestFunction<T>): number {
  for (var i=x.length-1; i>=0; --i)
    if (ft(x[i], i, x)) break;
  return ++i;
}


/**
 * Find index of first value passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns first index of value, -1 if not found
 */
export function search<T>(x: T[], ft: TestFunction<T>): number {
  return x.findIndex(ft);
}


/**
 * Find index of last value passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns last index of value, -1 if not found
 */
export function searchRight<T>(x: T[], ft: TestFunction<T>): number {
  for (var i=x.length-1; i>=0; --i)
    if (ft(x[i], i, x)) return i;
  return -1;
}


/**
 * Find indices of values passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns indices of value
 */
export function searchAll<T>(x: T[], ft: TestFunction<T>): number[] {
  var i = -1, a = [];
  for (var v of x)
    if (ft(v, ++i, x)) a.push(i);
  return a;
}


/**
 * Find first index of a value.
 * @param x an array
 * @param v search value
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns first index of value, -1 if not found
 */
export function searchValue<T, U=T>(x: T[], v: T, fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number {
  var fc = fc || COMPARE;
  var fm = fm || IDENTITY;
  var w  = fm(v, 0, null), i = -1;
  for (var vx of x) {
    var wx = fm(vx, ++i, x);
    if (fc(wx, w)===0) return i;
  }
  return -1;
}


/**
 * Find last index of a value.
 * @param x an array
 * @param v search value
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns last index of value, -1 if not found
 */
export function searchValueRight<T, U=T>(x: T[], v: T, fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number {
  var fc = fc || COMPARE;
  var fm = fm || IDENTITY;
  var w = fm(v, 0, null);
  for (var i=x.length-1; i>=0; --i) {
    var wx = fm(x[i], i, x);
    if (fc(wx, w)===0) return i;
  }
  return -1;
}


/**
 * Find indices of value.
 * @param x an array
 * @param v search value
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns indices of value
 */
export function searchValueAll<T, U=T>(x: T[], v: T, fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number[] {
  var fc = fc || COMPARE;
  var fm = fm || IDENTITY;
  var w = fm(v, 0, null);
  var i = -1, a = [];
  for (var vx of x) {
    var wx = fm(vx, ++i, x);
    if (fc(wx, w)===0) a.push(i);
  }
  return a;
}


/**
 * Find first index of an infix.
 * @param x an array
 * @param y search infix
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns first i | x[i..i+|y|] = y else -1
 */
export function searchInfix<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number {
  for (var i of searchInfixAllList(x, y, fc, fm))
    return i;
  return -1;
}


/**
 * Find last index of an infix.
 * @param x an array
 * @param y search infix
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns first i | x[i..i+|y|] = y else -1
 */
export function searchInfixRight<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number {
  var a = -1;
  for (var i of searchInfixAllList(x, y, fc, fm))
    a = i;
  return a;
}


/**
 * Find indices of an infix.
 * @param x an array
 * @param y search infix
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns i₀, i₁, ... | x[j..j+|y|] = y; j ∈ [i₀, i₁, ...]
 */
export function searchInfixAll<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number[] {
  return [...searchInfixAllList(x, y, fc, fm)];
}


/**
 * Find first index of a subsequence.
 * @param x an array
 * @param y search subsequence
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns start index of subsequence, -1 if not found
 */
export function searchSubsequence<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number {
  var fc = fc || COMPARE;
  var fm = fm || IDENTITY;
  var y1 = [...y].map(fm), Y = y1.length;
  var a = -1, i = -1, j = 0;
  for (var vx of x) {
    var wx = fm(vx, ++i, x);
    if (fc(wx, y1[j])!==0) continue;
    if (a<0) a = i;
    if (++j>=Y) return a;
  }
  return -1;
}


/**
 * Check if array has a value.
 * @param x an array
 * @param v search value
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns v ∈ x?
 */
export function hasValue<T, U=T>(x: T[], v: T, fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  return searchValue(x, v, fc, fm) >= 0;
}


/**
 * Check if array starts with a prefix.
 * @param x an array
 * @param y search prefix
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x[0..|y|] = y?
 */
export function hasPrefix<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  var Y = y.length;
  return Y===0 || compare(x.slice(0, Y), y, fc, fm)===0;
}


/**
 * Check if array ends with a suffix.
 * @param x an array
 * @param y search suffix
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x[|x|-|y|..] = y?
 */
export function hasSuffix<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  var Y = y.length;
  return Y===0 || compare(x.slice(-Y), y, fc, fm)===0;
}


/**
 * Check if array contains an infix.
 * @param x an array
 * @param y search infix
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x[i..I] = y for some i, I?
 */
export function hasInfix<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  return searchInfix(x, y, fc, fm) >= 0;
}


/**
 * Check if array has a subsequence.
 * @param x an array
 * @param y search subsequence
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x[i₀] ⧺ x[i₁] ⧺ ... = y, for some i₀, i₁, ...? | i₀ < i₁ < ...
 */
export function hasSubsequence<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  return searchSubsequence(x, y, fc, fm) >= 0;
}


/**
 * Check if array has a permutation.
 * @param x an array
 * @param y search permutation
 * @param fc map function (v, i, x)
 * @param fm compare function (a, b)
 * @returns x contains a shuffled version of y?
 */
export function hasPermutation<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  var x1 = fm? x.map(fm) : x.slice();
  var y1 = fm? y.map(fm) : y.slice();
  return hasSubsequence(x1.sort(), y1.sort(), fc, fm);
}




// FUNCTIONAL
// ----------

/**
 * Call a function for each value.
 * @param x an array
 * @param fp process function (v, i, x)
 */
export function forEach<T>(x: T[], fp: ProcessFunction<T>): void {
  x.forEach(fp);
}


/**
 * Check if any value satisfies a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns true if ft(vᵢ) = true for some vᵢ ∈ x
 */
export function some<T>(x: T[], ft: TestFunction<T> | null=null): boolean {
  if (ft) return x.some(ft);
  else    return someBoolean(x);
}
export {some as anyOf};

function someBoolean<T>(x: T[]): boolean {
  for (var i=0, I=x.length; i<I; ++i)
    if (x[i]) return true;
  return false;
}


/**
 * Check if all values satisfy a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns true if ft(vᵢ) = true for all vᵢ ∈ x
 */
export function every<T>(x: T[], ft: TestFunction<T> | null=null): boolean {
  if (ft) return x.every(ft);
  else    return everyBoolean(x);
}
export {every as allOf};

function everyBoolean<T>(x: T[]): boolean {
  for (var i=0, I=x.length; i<I; ++i)
    if (!x[i]) return false;
  return true;
}


/**
 * Transform values of an array.
 * @param x an array
 * @param fm map function (v, i, x)
 * @returns [fm(v₀), fm(v₁), ...] | vᵢ ∈ x
 */
export function map<T, U=T>(x: T[], fm: MapFunction<T, T|U>): (T|U)[] {
  return x.map(fm);
}


/**
 * Transform values of an array.
 * @param x an array (updated)
 * @param fm map function (v, i, x)
 * @returns x = [fm(v₀), fm(v₁), ...]; vᵢ ∈ x
 */
export function map$<T>(x: T[], fm: MapFunction<T, T>): T[] {
  for (var i=0, I=x.length; i<I; ++i)
    x[i] = fm(x[i], i, x);
  return x;
}


/**
 * Reduce values of array to a single value.
 * @param x an array
 * @param fr reduce function (acc, v, i, x)
 * @param acc initial value
 * @returns fr(fr(acc, v₀), v₁)... | fr(acc, v₀) = v₀ if acc not given
 */
export function reduce<T, U=T>(x: T[], fr: ReduceFunction<T, T|U>, acc?: T|U): T|U {
  var init = arguments.length <= 2;
  return init? x.reduce(fr as any) : x.reduce(fr, acc);
}


/**
 * Reduce values from right, to a single value.
 * @param x an array
 * @param fr reduce function (acc, v, i, x)
 * @param acc initial value
 * @returns fr(fr(acc, vₓ₋₀), vₓ₋₁)... | fr(acc, vₓ₋₀) = vₓ₋₀ if acc not given
 */
export function reduceRight<T, U=T>(x: T[], fr: ReduceFunction<T, T|U>, acc?: T|U): T|U {
  var init = arguments.length <= 2;
  for (var i=x.length-1; i>=0; --i) {
    if (init)  { acc = x[i]; init = false; }
    else acc = fr(acc, x[i], i, x);
  }
  return acc;
}


/**
 * Keep values which pass a test.
 * @param x an array (updated)
 * @param ft test function (v, i, x)
 * @returns x = [v₀, v₁, ...] | ft(vᵢ) = true; vᵢ ∈ x
 */
export function filter$<T>(x: T[], ft: TestFunction<T>): T[] {
  for (var i=0, j=0, I=x.length; i<I; ++i)
    if (ft(x[i], i, x)) x[j++] = x[i];
  x.length = j;
  return x;
}


/**
 * Keep values which pass a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns [v₀, v₁, ...] | ft(vᵢ) = true; vᵢ ∈ x
 */
export function filter<T>(x: T[], ft: TestFunction<T>): T[] {
  return x.filter(ft);
}
export {filter as findAll};


/**
 * Keep values at given indices.
 * @param x an array
 * @param is indices
 * @returns v₀, v₁, ... | vᵢ = x[i]; i ∈ is
 */
export function filterAt<T>(x: T[], is: number[]): T[] {
  var X = x.length, a = [];
  for (var i of is)
    if (i>=0 && i<X) a.push(x[i]);
  return a;
}


/**
 * Discard values which pass a test.
 * @param x an array (updated)
 * @param ft test function (v, i, x)
 * @returns x = [v₀, v₁, ...] | ft(vᵢ) = false; vᵢ ∈ x
 */
export function reject$<T>(x: T[], ft: TestFunction<T>): T[] {
  for (var i=0, j=0, I=x.length; i<I; ++i)
    if (!ft(x[i], i, x)) x[j++] = x[i];
  x.length = j;
  return x;
}


/**
 * Discard values which pass a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns [v₀, v₁, ...] | ft(vᵢ) = false; vᵢ ∈ x
 */
export function reject<T>(x: T[], ft: TestFunction<T>): T[] {
  var i = -1, a = [];
  for (var v of x)
    if (!ft(v, ++i, x)) a.push(v);
  return a;
}


/**
 * Discard values at given indices.
 * @param x an array
 * @param is indices
 * @returns [v₀, v₁, ...] | vᵢ = x[i]; i ∉ is
 */
export function rejectAt<T>(x: T[], is: number[]): T[] {
  var i = -1, a = [];
  for (var v of x)
    if (!is.includes(++i)) a.push(v);
  return a;
}


/**
 * Produce accumulating values.
 * @param x an array
 * @param fr reduce function (acc, v, i, x)
 * @param acc initial value
 * @returns [fr(acc, v₀), fr(fr(acc, v₀), v₁), ...] | fr(acc, v₀) = v₀ if acc not given
 */
export function accumulate<T, U=T>(x: T[], fr: ReduceFunction<T, T|U>, acc?: T|U): T|U[] {
  var init = arguments.length <= 2;
  var i = -1, a = [];
  for (var v of x) {
    if (init) { init = false; acc = v; ++i; }
    else acc = fr(acc, v, ++i, x);
    a.push(acc);
  }
  return a;
}


/**
 * Flatten nested array to given depth.
 * @param x a nested array
 * @param n maximum depth [-1 ⇒ all]
 * @param fm map function (v, i, x)
 * @param ft flatten test function (v, i, x) [is]
 * @returns flat iterable
 */
export function flat(x: any[], n: number=-1, fm: MapFunction<any, any> | null=null, ft: TestFunction<any> | null=null): any[] {
  var fm = fm || IDENTITY;
  var ft = ft || is;
  return flatTo$([], x, n, fm, ft);
}

function flatTo$(a: any[], x: any[], n: number, fm: MapFunction<any, any>, ft: TestFunction<any>): any[] {
  var i = -1;
  for (var v of x) {
    var w = fm(v, ++i, x);
    if (n!==0 && ft(w, i, x)) flatTo$(a, v, n-1, fm, ft);
    else a.push(w);
  }
  return a;
}


/**
 * Flatten nested array, based on map function.
 * @param x an array
 * @param fm map function (v, i, x)
 * @param ft flatten test function (v, i, x) [is]
 * @returns flat iterable
 */
export function flatMap(x: any[], fm: MapFunction<any, any> | null=null, ft: TestFunction<any> | null=null): any[] {
  var fm = fm || IDENTITY;
  var ft = ft || is;
  var i = -1, a = [];
  for (var v of x) {
    var w = fm(v, ++i, x);
    if (ft(w, i, x)) concat$(a, w);
    else a.push(w);
  }
  return a;
}


/**
 * Combine values from arrays.
 * @param xs arrays
 * @param fm map function (vs, i)
 * @param fe end function (dones) [some]
 * @param vd default value
 * @returns [fm([x₀[0], x₁[0], ...]), fm([x₀[1], x₁[1], ...]), ...]
 */
export function zip<T, U=T[]>(xs: T[][], fm: MapFunction<T[], T[]|U> | null=null, fe: TestEndFunction=null, vd?: T): (T[]|U)[] {
  var fm = fm || IDENTITY;
  var fe = fe || some as TestEndFunction;
  var X = xs.length, a = [];
  if (X===0) return a;
  var ds = new Array(X).fill(false);
  var ls = xs.map(x => x.length);
  for (var i=0;; ++i) {
    for (var j=0, vs=[]; j<X; ++j) {
      ds[j] = i>=ls[j];
      vs[j] = ds[j]? vd : xs[j][i];
    }
    if (fe(ds)) break;
    a.push(fm(vs, i, null));
  }
  return a;
}




// MANIPULATION
// ------------

/**
 * Fill with given value.
 * @param x an array
 * @param v value
 * @param i start index [0]
 * @param I end index [|x|]
 * @returns x' | x' = x; x'[i..I] = v
 */
export function fill<T>(x: T[], v: T, i: number=0, I: number=x.length): T[] {
  return x.slice().fill(v, i, I);
}


/**
 * Fill with given value.
 * @param x an array (updated)
 * @param v value
 * @param i start index [0]
 * @param I end index [|x|]
 * @returns x | x[i..I] = v
 */
export function fill$<T>(x: T[], v: T, i: number=0, I: number=x.length): T[] {
  return x.fill(v, i, I);
}


/**
 * Arrange values in order.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x' | x' = x; x'[i] ≤ x'[j] ∀ i ≤ j
 */
export function sort<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  return sort$(x.slice(), fc, fm);
}


/**
 * Arrange values in order.
 * @param x an array (updated)
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x | x[i] ≤ x[j] ∀ i ≤ j
 */
export function sort$<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  var fc = fc || COMPARE;
  if (fm) return sortDual$(x, fc, fm);
  else    return x.sort(fc);
}

function sortDual$<T, U=T>(x: T[], fc: CompareFunction<T|U>, fm: MapFunction<T, T|U>): T[] {
  var i = -1, m = new Map();
  for (var v of x)
    m.set(v, fm(v, ++i, x));
  return x.sort((a, b) => fc(m.get(a), m.get(b)));
}


/**
 * Add value to the end.
 * @param x an array
 * @param vs values to add
 * @returns [...x, ...vs]
 */
export function push<T>(x: T[], ...vs: T[]): T[] {
  return x.concat(vs);
}


/**
 * Add values to the end.
 * @param x an array (updated)
 * @param vs values to add
 * @returns x | x = [...x, ...vs]
 */
export function push$<T>(x: T[], ...vs: T[]): T[] {
  x.push(...vs);
  return x;
}


/**
 * Remove last value.
 * @param x an array
 * @returns x[0..|x|-1]
 */
export function pop<T>(x: T[]): T[] {
  return x.slice(0, -1);
}


/**
 * Remove last value.
 * @param x an array (updated)
 * @returns x = x[0..|x|-1]
 */
export function pop$<T>(x: T[]): T[] {
  x.pop();
  return x;
}


/**
 * Remove first value.
 * @param x an array
 * @returns x[1..]
 */
export function shift<T>(x: T[]): T[] {
  return x.slice(1);
}


/**
 * Remove first value.
 * @param x an array (updated)
 * @returns x = x[1..]
 */
export function shift$<T>(x: T[]): T[] {
  x.shift();
  return x;
}


/**
 * Add values to the start.
 * @param x an array
 * @param vs values to add
 * @returns [...vs, ...x]
 */
export function unshift<T>(x: Iterable<T>, ...vs: T[]): T[] {
  return concat$(vs, x);
}


/**
 * Add values to the start.
 * @param x an array (updated)
 * @param vs values to add
 * @returns x = [...vs, ...x]
 */
export function unshift$<T>(x: T[], ...vs: T[]): T[] {
  x.unshift(...vs);
  return x;
}


/**
 * Copy part of array to another.
 * @param x target array
 * @param y source array
 * @param j write index [0]
 * @param i read start index [0]
 * @param I read end index [|x|]
 * @returns x[0..j] ⧺ y[i..I] ⧺ x[j+I-i..]
 */
export function copy<T>(x: T[], y: T[], j: number=0, i: number=0, I: number=y.length): T[] {
  return copy$(x.slice(), y, j, i, I);
}


/**
 * Copy part of array to another.
 * @param x target array (updated)
 * @param y source array
 * @param j write index [0]
 * @param i read start index [0]
 * @param I read end index [|x|]
 * @returns x = x[0..j] ⧺ y[i..I] ⧺ x[j+I-i..]
 */
export function copy$<T>(x: T[], y: T[], j: number=0, i: number=0, I: number=y.length): T[] {
  var j = index(x, j);
  var [i, I] = indexRange(y, i, I);
  for (; i<I; ++i, ++j)
    x[j] = y[i];
  return x;
}


/**
 * Copy part of array within.
 * @param x an array
 * @param j write index [0]
 * @param i read start index [0]
 * @param I read end index [|x|]
 * @returns x[0..j] ⧺ x[i..I] ⧺ x[j+I-i..]
 */
export function copyWithin<T>(x: T[], j: number=0, i: number=0, I: number=x.length): T[] {
  var I = i + Math.min(length(x, i, I), length(x, j));
  var p = x.slice(0, j);
  var q = x.slice(i, I);
  var r = x.slice(j+q.length);
  return p.concat(q, r);
}


/**
 * Copy part of array within.
 * @param x an array (updated)
 * @param j write index [0]
 * @param i read start index [0]
 * @param I read end index [|x|]
 * @returns x = x[0..j] ⧺ x[i..I] ⧺ x[j+I-i..]
 */
export function copyWithin$<T>(x: T[], j: number=0, i: number=0, I: number=x.length): T[] {
  return x.copyWithin(j, i, I);
}


/**
 * Move part of array within.
 * @param x an array
 * @param j write index [0]
 * @param i read start index [0]
 * @param I read end index [|x|]
 * @returns x[0..j] ⧺ x[i..I] ⧺ x[j..i] ⧺ x[I..]
 */
export function moveWithin<T>(x: T[], j: number=0, i: number=0, I: number=x.length): T[] {
  if (j<i) return movePart(x, j, i, I);
  else     return movePart(x, i, I, j);
}

function movePart<T>(x: T[], i: number, j: number, k: number): T[] {
  return x.slice(0, i).concat(
    x.slice(j, k),
    x.slice(i, j),
    x.slice(k)
  );
}


/**
 * Move part of array within.
 * @param x an array (updated)
 * @param j write index [0]
 * @param i read start index [0]
 * @param I read end index [|x|]
 * @returns x = x[0..j] ⧺ x[i..I] ⧺ x[j..i] ⧺ x[I..]
 */
export function moveWithin$<T>(x: T[], j: number=0, i: number=0, I: number=x.length): T[] {
  var p = x.slice(i, I), P = p.length;
  if (j<i) x.copyWithin(j+P, j, i);
  else     x.copyWithin(i,   I, j);
  return copy$(x, p, j<i? j : j-P);
}


/**
 * Remove or replace existing values.
 * @param x an array
 * @param i remove index
 * @param n number of values to remove [rest]
 * @param vs values to insert
 * @returns x[0..i] ⧺ vs ⧺ x[i+n..]
 */
export function splice<T>(x: T[], i: number, n: number=x.length-i, ...vs: T[]): T[] {
  return concat$(x.slice(0, i), vs, x.slice(i+n));
}


/**
 * Remove or replace existing values.
 * @param x an array (updated)
 * @param i remove index
 * @param n number of values to remove [rest]
 * @param vs values to insert
 * @returns x = x[0..i] ⧺ vs ⧺ x[i+n..]
 */
export function splice$<T>(x: T[], i: number, n: number=x.length-i, ...vs: T[]): T[] {
  x.splice(i, n, ...vs);
  return x;
}


/**
 * Break array considering test as separator.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns x[j..k] ⧺ x[l..m] ⧺ ... | ft(x[i]) = true; i = 0..j / k..l / ...
 */
export function split<T>(x: T[], ft: TestFunction<T>): T[][] {
  var i = -1, a = [], b = [];
  for (var v of x) {
    if (!ft(v, ++i, x))  b.push(v);
    else if (b.length) { a.push(b); b = []; }
  }
  if (b.length) a.push(b);
  return a;
}


/**
 * Break array considering indices as separator.
 * @param x an array
 * @param is indices (sorted)
 * @returns x[j..k] ⧺ x[l..m] ⧺ ... | ft(x[i]) = true; i = 0..j / k..l / ...; i ∈ is
 */
export function splitAt<T>(x: T[], is: number[]): T[][] {
  var i = -1, a = [], b = [];
  for (var v of x) {
    if (!is.includes(++i)) b.push(v);
    else if(b.length)    { a.push(b); b = []; }
  }
  if (b.length) a.push(b);
  return a;
}


/**
 * Break array when test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns x[0..j] ⧺ x[j..k] ⧺ ... | ft(x[i]) = true; i = j, k, ...
 */
export function cut<T>(x: T[], ft: TestFunction<T>): T[][] {
  var j = 0, a = [];
  for (var i=0, I=x.length; i<I; ++i) {
    if (!ft(x[i], i, x)) continue;
    a.push(x.slice(j, i));
    j = i;
  }
  a.push(x.slice(j));
  return a;
}


/**
 * Break array after test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns x[0..j+1] ⧺ x[j+1..k] ⧺ ... | ft(x[i]) = true; i = j, k, ...
 */
export function cutRight<T>(x: T[], ft: TestFunction<T>): T[][] {
  var j = 0, a = [];
  for (var i=0, I=x.length; i<I; ++i) {
    if (!ft(x[i], i, x)) continue;
    a.push(x.slice(j, i+1));
    j = i+1;
  }
  a.push(x.slice(j));
  return a;
}


/**
 * Break array at given indices.
 * @param x an array
 * @param is split indices (sorted)
 * @returns x[0..j] ⧺ x[j..k] ⧺ ... | ft(x[i]) = true; i = j, k, ...; i ∈ is
 */
export function cutAt<T>(x: T[], is: number[]): T[][] {
  var j = 0, a = [];
  for (var i of is) {
    i = Math.max(j, index(x, i));
    a.push(x.slice(j, i));
    j = i;
  }
  a.push(x.slice(i));
  return a;
}


/**
 * Break array after given indices.
 * @param x an array
 * @param is split indices (sorted)
 * @returns x[0..j+1] ⧺ x[j+1..k] ⧺ ... | ft(x[i]) = true; i = j, k, ...; i ∈ is
 */
export function cutAtRight<T>(x: T[], is: number[]): T[][] {
  return cutAt(x, is.map(i => i+1));
}


/**
 * Keep similar values together and in order.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x[0..k], x[k..l], ... | fc(x[i], x[j]) = 0; i, j = 0..k / k..l / ...
 */
export function group<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[][] {
  var fc = fc || COMPARE;
  var fm = fm || IDENTITY;
  var a  = [], b = [];
  var u: T|U,  i = -1;
  for (var v of x) {
    var w = fm(v, ++i, x);
    if (i===0 || fc(u, w)===0) b.push(v);
    else { a.push(b); b = [v]; }
    u = w;
  }
  a.push(b);
  return a;
}


/**
 * Segregate values by test result.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns [satisfies, doesnt]
 */
export function partition<T>(x: T[], ft: TestFunction<T>): [T[], T[]] {
  var t: T[] = [], f: T[] = [], i = -1;
  for (var v of x) {
    if (ft(v, ++i, x)) t.push(v);
    else f.push(v);
  }
  return [t, f];
}


/**
 * Segregate values by similarity.
 * @param x an array
 * @param fm map function (v, i, x)
 * @returns Map \{key ⇒ values\}
 */
export function partitionAs<T, U=T>(x: T[], fm: MapFunction<T, T|U> | null=null): Map<T|U, T[]> {
  var fm = fm || IDENTITY;
  var i  = -1, a = new Map();
  for (var v of x) {
    var w = fm(v, ++i, x);
    if (!a.has(w)) a.set(w, []);
    a.get(w).push(v);
  }
  return a;
}


/**
 * Break array into chunks of given size.
 * @param x an array
 * @param n chunk size [1]
 * @param s chunk step [n]
 * @returns x[0..n], x[s..s+n], x[2s..2s+n], ...
 */
export function chunk<T>(x: T[], n: number=1, s: number=n): T[][] {
  var a = [];
  for (var i=0, I=x.length; i<I; i+=s)
    a.push(x.slice(i, i+n));
  return a;
}


/**
 * Give values that cycle through array.
 * @param x an array
 * @param i start index [0]
 * @param n number of values [|x|]
 */
export function cycle<T>(x: T[], i: number=0, n: number=x.length): T[] {
  var X = x.length;
  if (n<=0 || X===0) return [];
  var i = index(x, i);
  var a = x.slice(i, i+n);
  n -= a.length;
  for (var m=0, M=Math.floor(n/X); m<M; ++m)
    concat$(a, x);
  return concat$(a, x.slice(0, n % X));
}


/**
 * Repeat an array given times.
 * @param x an array
 * @param n times [1]
 * @returns ...x, ...x, ...(n times)
 */
export function repeat<T>(x: T[], n: number=1): T[] {
  for (var a=[]; n>0; --n)
    concat$(a, x);
  return a;
}


/**
 * Reverse the values.
 * @param x an array
 * @returns x[|x|-1], x[|x|-2], ..., x[1], x[0]
 */
export function reverse<T>(x: T[]): T[] {
  return x.slice().reverse();
}


/**
 * Reverse the values.
 * @param x an array (updated)
 * @returns x = [x[|x|-1], x[|x|-2], ..., x[1], x[0]]
 */
export function reverse$<T>(x: T[]): T[] {
  return x.reverse();
}


/**
 * Rotate values in array.
 * @param x an array
 * @param n rotate amount (+ve: left, -ve: right) [0]
 * @returns x[n..] ⧺ x[0..n]
 */
export function rotate<T>(x: T[], n: number=0): T[] {
  var n = mod(n, x.length);
  return concat$(x.slice(n), x.slice(0, n));
}


/**
 * Rotate values in array.
 * @param x an array (updated)
 * @param n rotate amount (+ve: left, -ve: right) [0]
 * @returns x = x[n..] ⧺ x[0..n]
 */
export function rotate$<T>(x: T[], n: number=0): T[] {
  var n = mod(n, x.length);
  var y = x.slice(0, n);
  x.copyWithin(0, n);
  return copy$(x, y, x.length-n);
}


/**
 * Place a separator between every value.
 * @param x an array
 * @param v separator
 * @returns [x[0], v, x[1], v, ..., x[|x|-1]]
 */
export function intersperse<T>(x: T[], v: T): T[] {
  var a = [], i = -1;
  for (var u of x) {
    if (++i>0) a.push(v);
    a.push(u);
  }
  return a;
}


/**
 * Estimate new values between existing ones.
 * @param x an array
 * @param fc combine function (a, b)
 * @returns [x[0], fc(x[0], x[1]), x[1], fc(x[1], x[2]), ..., x[|x|-1]]
 */
export function interpolate<T>(x: T[], fc: CombineFunction<T>): T[] {
  var a = [], u: T, i = -1;
  for (var v of x) {
    if (++i>0) a.push(fc(u, v));
    a.push(u = v);
  }
  return a;
}


/**
 * Place values of an array between another.
 * @param x an array
 * @param y another array
 * @param m number of values from x [1]
 * @param n number of values from y [1]
 * @param s step size for x [m]
 * @param t step size for y [n]
 * @returns x[0..m], y[0..n], x[s..s+m], y[t..t+n], ..., x[k*s..|x|-1] | k ∈ W
 */
export function intermix<T>(x: T[], y: T[], m: number=1, n: number=1, s: number=m, t: number=n): T[] {
  var X = x.length, Y = y.length, a = [];
  for (var i=0, j=0; i<X; i+=s) {
    if (i>0) {
      for (var k=j, K=k+n; k<K; ++k)
        a.push(y[k % Y]);
      j += t;
    }
    concat$(a, x.slice(i, i+m));
  }
  return a;
}


/**
 * Place values from iterables alternately.
 * @param xs arrays
 * @returns x₀[0], x₁[0], ..., x₀[1], x₁[0], ... | [x₀, x₁, ...] = xs
 */
export function interleave<T>(xs: T[][]): T[] {
  var a = [];
  for (var i=0;; ++i) {
    var n = 0;
    for (var x of xs)
      if (i<x.length) { a.push(x[i]); ++n; }
    if (n===0) break;
  }
  return a;
}




// COMBINE
// -------

/**
 * Append values from arrays.
 * @param xs arrays
 * @returns ...x₀, ...x₁, ... | [x₀, x₁, ...] = xs
 */
export function concat<T>(...xs: T[][]): T[] {
  return concat$([], ...xs);
}


/**
 * Append values from arrays.
 * @param x an array (updated)
 * @param ys arrays to append
 * @returns x = [...x, ...y₀, ...y₁, ...] | [y₀, y₁, ...] = ys
 */
export function concat$<T>(x: T[], ...ys: Iterable<T>[]): T[] {
  for (var y of ys)
    x.push(...y);
  return x;
}


/**
 * Join values together into a string.
 * @param x an array
 * @param sep separator [,]
 * @returns "$\{v₀\}$\{sep\}$\{v₁\}..." | vᵢ ∈ x
 */
export function join<T>(x: T[], sep: string=","): string {
  return x.join(sep);
}




// SET OPERATIONS
// --------------

/**
 * Check if there are no duplicate values.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns ∀ vᵢ, vⱼ ∈ x, is vᵢ ≠ vⱼ?
 */
export function isUnique<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  if (fc) return isUniqueDual(x, fc, fm);
  else    return isUniqueMap (x, fm);
}

function isUniqueMap<T, U=T>(x: T[], fm: MapFunction<T, T|U> | null=null): boolean {
  var fm = fm || IDENTITY;
  var s  = new Set(), i = -1;
  for (var v of x) {
    var w = fm(v, ++i, x);
    if (s.has(w)) return false;
    s.add(w);
  }
  return true;
}

function isUniqueDual<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  var fc = fc || COMPARE;
  var fm = fm || IDENTITY;
  var x1 = [...x].map(fm);
  for (var wx of x1) {
    for (var wy of x1)
      if (fc(wx, wy)===0) return false;
  }
  return true;
}


/**
 * Check if arrays have no value in common.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x ∩ y = Φ?
 */
export function isDisjoint<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  if (fc) return isDisjointDual(x, y, fc, fm);
  else    return isDisjointMap (x, y, fm);
}

function isDisjointMap<T, U=T>(x: T[], y: T[], fm: MapFunction<T, T|U> | null=null): boolean {
  var fm = fm || IDENTITY;
  var s  = toSet(y, fm), i = -1;
  for (var v of x) {
    var w = fm(v, ++i, x);
    if (s.has(w)) return false;
  }
  return true;
}

function isDisjointDual<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  var fc = fc || COMPARE;
  var fm = fm || IDENTITY;
  var y1 = [...y].map(fm), i = -1;
  for (var vx of x) {
    var wx = fm(vx, ++i, x);
    for (var wy of y1)
      if (fc(wx, wy)===0) return false;
  }
  return true;
}


/**
 * Remove duplicate values.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns v₀, v₁, ... | vᵢ ∈ x; vᵢ ≠ vⱼ ∀ i, j
 */
export function unique<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  if (fc) return uniqueDual(x, fc, fm);
  else    return uniqueMap (x, fm);
}

function uniqueMap<T, U=T>(x: T[], fm: MapFunction<T, T|U> | null=null): T[] {
  var fm = fm || IDENTITY;
  var s  = new Set();
  var i  = -1, a = [];
  for (var v of x) {
    var w = fm(v, ++i, x);
    if (s.has(w)) continue;
    s.add(w); a.push(v);
  }
  return a;
}

function uniqueDual<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  var fc = fc || COMPARE;
  var fm = fm || IDENTITY;
  var i  = -1, s = [], a = [];
  x: for (var vx of x) {
    var wx = fm(vx, ++i, x);
    for (var ws of s)
      if (fc(ws, wx)===0) continue x;
    s.push(wx); a.push(vx);
  }
  return a;
}


/**
 * Give values present in any array.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x ∪ y = \{v | v ∈ x or v ∈ y\}
 */
export function union<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  return union$(x.slice(), y, fc, fm);
}


/**
 * Give values present in any array.
 * @param x an array (updated)
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x = x ∪ y = \{v | v ∈ x or v ∈ y\}
 */
export function union$<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  if (fc) return unionDual$(x, y, fc, fm);
  else    return unionMap$ (x, y, fm);
}

function unionMap$<T, U=T>(x: T[], y: T[], fm: MapFunction<T, T|U> | null=null): T[] {
  var fm = fm || IDENTITY;
  var s  = toSet(x, fm), i = -1;
  for (var vy of y) {
    var wy = fm(vy, ++i, y);
    if (!s.has(wy)) x.push(vy);
  }
  return x;
}

function unionDual$<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  var fc = fc || COMPARE;
  var fm = fm || IDENTITY;
  var x1 = x.map(fm), i = -1;
  y: for (var vy of y) {
    var wy = fm(vy, ++i, y);
    for (var wx of x1)
      if (fc(wx, wy)===0) continue y;
    x.push(vy);
  }
  return x;
}


/**
 * Gives values present in both arrays.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x ∩ y = \{v | v ∈ x, v ∈ y\}
 */
export function intersection<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  if (fc) return intersectionDual(x, y, fc, fm);
  else    return intersectionMap (x, y, fm);
}

function intersectionMap<T, U=T>(x: T[], y: T[], fm: MapFunction<T, T|U> | null=null): T[] {
  var fm = fm || IDENTITY;
  var s  = toSet(y, fm);
  var i  = -1, a = [];
  for (var vx of x) {
    var wx = fm(vx, ++i, x);
    if (s.has(wx)) a.push(vx);
  }
  return a;
}

function intersectionDual<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  var fc = fc || COMPARE;
  var fm = fm || IDENTITY;
  var y1 = [...y].map(fm);
  var i  = -1, a = [];
  x: for (var vx of x) {
    var wx = fm(vx, ++i, x);
    for (var wy of y1)
      if (fc(wx, wy)===0) { a.push(vx); continue x; }
  }
  return a;
}


/**
 * Give values not present in another array.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x - y = \{v | v ∈ x, v ∉ y\}
 */
export function difference<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  if (fc) return differenceDual(x, y, fc, fm);
  else    return differenceMap (x, y, fm);
}

function differenceMap<T, U=T>(x: T[], y: T[], fm: MapFunction<T, T|U> | null=null): T[] {
  var fm = fm || IDENTITY;
  var s  = toSet(y, fm);
  var i  = -1, a = [];
  for (var vx of x) {
    var wx = fm(vx, ++i, x);
    if (!s.has(wx)) a.push(vx);
  }
  return a;
}

function differenceDual<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  var fc = fc || COMPARE;
  var fm = fm || IDENTITY;
  var y1 = [...y].map(fm);
  var i  = -1, a  = [];
  x: for (var vx of x) {
    var wx = fm(vx, ++i, x);
    for (var wy of y1)
      if (fc(wx, wy)===0) continue x;
    a.push(vx);
  }
  return a;
}


/**
 * Give values not present in both arrays.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x-y ∪ y-x
 */
export function symmetricDifference<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  var x0 = from$(x), y0 = from$(y);
  var ax = difference(x0, y0, fc, fm);
  var ay = difference(y0, x0, fc, fm);
  return concat$(ax, ay);
}


/**
 * List cartesian product of arrays.
 * @param xs arrays
 * @param fm map function (vs, i)
 * @returns x₀ × x₁ × ... = \{[v₀, v₁, ...] | v₀ ∈ x₀, v₁ ∈ x₁, ...] \}
 */
export function cartesianProduct<T, U=T>(xs: T[][], fm: MapFunction<T[], T[]|U> | null=null): (T[]|U)[] {
  var fm = fm || IDENTITY;
  var XS = xs.length, a = [];
  if (XS===0) return a;
  var is = new Array(XS).fill(0);
  var ls = xs.map(x => x.length);
  if (ls.some(l => l===0)) return a;
  for (var i=0;; ++i) {
    for (var j=0, vs=[]; j<XS; ++j)
      vs.push(xs[j][is[j]]);
    a.push(fm(vs, i, null));
    for (var r=XS-1; r>=0; --r) {
      if (++is[r]<ls[r]) break;
      is[r] = 0;
    }
    if (r<0) break;
  }
  return a;
}
