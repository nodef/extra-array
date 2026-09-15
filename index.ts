// #region TYPES
// =============

/** Entries is an array of index-value pairs, with unique indices. */
export type Entries<T> = [number, T][];
/** IEntries is a list of index-value pairs, with unique indices. */
export type IEntries<T> = Iterable<[number, T]>;


/** Lists is a pair of index array and value array, with unique indices. */
export type Lists<T> = [number[], T[]];
/** ILists is a pair of index iterable list and value iterable list, with unique indices. */
export type ILists<T> = [Iterable<number>, Iterable<T>];


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
export type ProcessFunction<T> = (v: T, i: number, x: T[] | null) => void;


/**
 * Handle selection of values in an array.
 * @param v value in array
 * @param i index of value in array
 * @param x array containing the value
 * @returns selected?
 */
export type TestFunction<T> = (v: T, i: number, x: T[] | null) => boolean;


/**
 * Handle transformation of a value to another.
 * @param v value in array
 * @param i index of value in array
 * @param x array containing the value
 * @returns transformed value
 */
export type MapFunction<T, U> = (v: T, i: number, x: T[] | null) => U;


/**
 * Handle reduction of multiple values into a single value.
 * @param acc accumulator (temporary result)
 * @param v value in array
 * @param i index of value in array
 * @param x array containing the value
 * @returns reduced value
 */
export type ReduceFunction<T, U> = (acc: U, v: T, i: number, x: T[] | null) => U;


/**
 * Handle ending of a combined array.
 * @param dones iᵗʰ array done?
 * @returns combined array done?
 */
export type EndFunction = (dones: boolean[]) => boolean;


/**
 * Handle swapping of two values in an array.
 * @param x an array (updated!)
 * @param i an index
 * @param j another index
 * @returns x | x[i] ⇔ x[j]
 */
export type SwapFunction<T> = (x: T[], i: number, j: number) => T[];
// #endregion




// #region METHODS
// ===============

// #region HELPERS
// ---------------

/** Return the same (first) value. */
function IDENTITY<T>(v: T): T {
  return v;
}


/** Compare two values. */
function COMPARE<T>(a: T, b: T): number {
  return a<b? -1 : (a>b? 1 : 0);
}


/** Find the remainder of x/y with sign of y (floored division). */
function mod(x: number, y: number): number {
  return x - y * Math.floor(x/y);
}


/** Convert an iterable to set. */
function toSet<T, U=T>(x: T[], fm: MapFunction<T, U> | null=null): Set<T|U> {
  if (!fm) return new Set(x);
  const a = new Set<U>(); let i = -1;
  for (const v of x)
    a.add(fm(v, ++i, x));
  return a;
}
// #endregion




// #region GENERATE
// ----------------

/**
 * Generate array from given number range.
 * @param v start number
 * @param V end number, excluding
 * @param dv step size [1]
 * @returns [v, v+dv, v+2dv, ...]
 */
export function fromRange(v: number, V: number, dv: number=1): number[] {
  const n = (V - v)/dv, a = [];
  for (let i=0; i<n; ++i, v+=dv)
    a.push(v);
  return a;
}


/**
 * Generate array from repeated function invocation.
 * @param fn function
 * @param n number of values
 * @returns [fn(), fn(), ...]
 */
export function fromInvocation<T>(fn: () => T, n: number): T[] {
  const a = [];
  for (let i=0; i<n; ++i)
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
  const a = [];
  if (n!==0) a.push(v);
  for (let i=1; i!==n; ++i)
    a.push(v = fm(v, i, null));
  return a;
}
export {fromApplication as fromApply};


/**
 * Convert an iterable to array.
 * @param x an iterable
 * @returns x as array
 */
export function fromIterable<T>(x: Iterable<T>): T[] {
  return [...x];
}
export {fromIterable as from};


/**
 * Convert an iterable to array!
 * @param x an iterable (updatable if array!)
 * @returns x as array
 */
export function fromIterable$<T>(x: Iterable<T>): T[] {
  return Array.isArray(x)? x : [...x];
}
export {fromIterable$ as from$};
// #endregion




// #region CLONE
// -------------

/**
 * Shallow clone an array.
 * @param x an array
 * @returns shallow clone of x
 */
export function shallowClone<T>(x: T[]): T[] {
  return x.slice();
}
export {shallowClone as clone};


/**
 * Deep clone an array.
 * @param x an array
 * @returns deep clone of x
 */
export function deepClone<T>(x: T[]): T[] {
  return structuredClone(x);
}
// #endregion




// #region ABOUT
// -------------

/**
 * Check if value is an array.
 * @param v a value
 * @returns v is an array?
 */
export function is(v: unknown): v is unknown[] {
  return Array.isArray(v);
}


/**
 * Obtain all indices.
 * @param x an array
 * @returns [0, 1, ..., |x|-1]
 */
export function keys<T>(x: T[]): number[] {
  return [...x.keys()];
}


/**
 * List all indices.
 * @param x an array
 * @returns 0, 1, ..., |x|-1
 */
export function ikeys<T>(x: T[]): IterableIterator<number> {
  return x.keys();
}


/**
 * Get all values.
 * @param x an array
 * @returns [v₀, v₁, ...] | vᵢ = x[i]
 */
export function values<T>(x: T[]): T[] {
  return x.slice();
}


/**
 * List all values.
 * @param x an array
 * @returns v₀, v₁, ... | vᵢ = x[i]
 */
export function ivalues<T>(x: T[]): IterableIterator<T> {
  return x.values();
}


/**
 * Obtain all index-value pairs.
 * @param x an array
 * @returns [[0, v₀], [1, v₁], ...] | vᵢ = x[i]
 */
export function entries<T>(x: T[]): Entries<T> {
  return [...x.entries()];
}


/**
 * List all index-value pairs.
 * @param x an array
 * @returns [0, v₀], [1, v₁], ... | vᵢ = x[i]
 */
export function ientries<T>(x: T[]): IEntries<T> {
  return x.entries();
}
// #endregion




// #region INDEX
// -------------

/**
 * Get zero-based index for an element in array.
 * @param x an array
 * @param i ±index
 * @returns i' | x[i'] = x[i]; i' ∈ [0, |x|]
 */
export function index<T>(x: T[], i: number): number {
  const X = x.length;
  return i>=0? Math.min(i, X) : Math.max(X+i, 0);
}


/**
 * Get zero-based index range for part of array.
 * @param x an array
 * @param i begin ±index [0]
 * @param I end ±index (exclusive) [|x|]
 * @returns [i', I'] | i' ≤ I'; i', I' ∈ [0, |x|]
 */
export function indexRange<T>(x: T[], i: number=0, I: number=x.length): [number, number] {
  const X = x.length;
  i = i>=0? Math.min(i, X) : Math.max(X+i, 0);
  I = I>=0? Math.min(I, X) : Math.max(X+I, 0);
  return [i, Math.max(i, I)];
}
// #endregion




// #region LENGTH
// --------------

/**
 * Check if an array is empty.
 * @param x an array
 * @returns |x| = 0?
 */
export function isEmpty<T>(x: T[]): boolean {
  return x.length===0;
}


/**
 * Find the length of an array.
 * @param x an array
 * @param i begin ±index [0]
 * @param I end ±index (exclusive) [X]
 * @returns |x[i..I]|
 */
export function length<T>(x: T[], i: number=0, I: number=x.length): number {
  [i, I] = indexRange(x, i, I);
  return I-i;
}
export {length as size};


/**
 * Resize an array to given length!
 * @param x an array
 * @param n new length
 * @param vd default value
 * @returns resized x
 */
export function resize$<T>(x: T[], n: number, vd: T): T[] {
  const X = x.length; x.length = n;
  if (n>X) x.fill(vd, X);
  return x;
}


/**
 * Remove all elements from an array!
 * @param x an array (updated!)
 * @returns cleared x
 */
export function clear$<T>(x: T[]): T[] {
  x.length = 0;
  return x;
}
// #endregion




// #region GET/SET
// ---------------

/**
 * Get value at index.
 * @param x an array
 * @param i index
 * @returns x[i]
 */
export function get<T>(x: T[], i: number): T {
  return x[index(x, i)];
}
export {get as at};


// Get values at index range.
// export {slice as getRange};


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
export function getPath(x: unknown[], p: number[]): unknown {
  let a: unknown | undefined = x;
  for (const i of p)
    a = is(a)? get(a, i) : undefined;
  return a;
}


/**
 * Check if nested array has a path.
 * @param x a nested array
 * @param p path
 * @returns x[i₀][i₁][...] exists? | [i₀, i₁, ...] = p
 */
export function hasPath(x: unknown[], p: number[]): boolean {
  let a: unknown | undefined = x;
  for (const i of p) {
    if (!is(a)) return false;
    a = get(a, i);
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
export {set as with};


/**
 * Set value at index!
 * @param x an array (updated!)
 * @param i index
 * @param v value
 * @returns x | x[i] = v
 */
export function set$<T>(x: T[], i: number, v: T): T[] {
  x[index(x, i)] = v;
  return x;
}


// TODO: setRange$()
// TODO: setAll$()


/**
 * Set value at path in a nested array!
 * @param x a nested array (updated!)
 * @param p path
 * @param v value
 * @returns x | x[i₀][i₁][...] = v; [i₀, i₁, ...] = p
 */
export function setPath$(x: unknown[], p: number[], v: unknown): unknown[] {
  const y = getPath(x, p.slice(0, -1));
  if (is(y)) set$(y, last(p) as number, v);
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
 * Exchange two values!
 * @param x an array (updated!)
 * @param i an index
 * @param j another index
 * @returns x | x[i] ⇔ x[j]
 */
export function swap$<T>(x: T[], i: number, j: number): T[] {
  i = index(x, i); j = index(x, j);
  const t = x[i]; x[i] = x[j]; x[j] = t;
  return x;
}


/**
 * Exchange two values!
 * @param x an array (updated!)
 * @param i an +ve index
 * @param j another +ve index
 * @returns x | x[i] ⇔ x[j]
 */
function swapRaw$<T>(x: T[], i: number, j: number): T[] {
  const t = x[i]; x[i] = x[j]; x[j] = t;
  return x;
}
// NOTE: May also be called swapUnchecked$().


/**
 * Exchange two ranges of values.
 * @param x an array
 * @param i begin index of first range
 * @param I end index of first range (exclusive)
 * @param j begin index of second range
 * @param J end index of second range (exclusive)
 * @returns x' | x' = x; x'[i..I] = x[j..J]; x'[j..J] = x[i..I]
 */
export function swapRanges<T>(x: T[], i: number, I: number, j: number, J: number): T[] {
  [i, I] = indexRange(x, i, I);
  [j, J] = indexRange(x, j, J);
  if (j<i) [i, I, j, J] = [j, J, i, I];
  if (j<I) return x.slice();  // Skip if ranges overlap!
  return x.slice(0, i).concat(x.slice(j, J), x.slice(i, j), x.slice(I));
}


/**
 * Exchange two ranges of values!
 * @param x an array (updated!)
 * @param i begin index of first range
 * @param I end index of first range (exclusive)
 * @param j begin index of second range
 * @param J end index of second range (exclusive)
 * @returns x | x[i..I] ⇔ x[j..J]
 */
export function swapRanges$<T>(x: T[], i: number, I: number, j: number, J: number): T[] {
  [i, I] = indexRange(x, i, I);
  [j, J] = indexRange(x, j, J);
  if (j<i) [i, I, j, J] = [j, J, i, I];
  if (j<I) return x;  // Skip if ranges overlap!
  const t = x.slice(i, I);
  x.splice(i, I-i, ...x.slice(j, J));
  x.splice(j, J-j, ...t);
  return x;
}
// TODO: swapAll$()


/**
 * Remove value at index.
 * @param x an array
 * @param i index
 * @returns x[0..i] ⧺ x[i+1..]
 */
export function remove<T>(x: T[], i: number): T[] {
  i = index(x, i);
  return x.slice(0, i).concat(x.slice(i+1));
}


/**
 * Remove value at index!
 * @param x an array (updated!)
 * @param i index
 * @returns x \\: [i]
 */
export function remove$<T>(x: T[], i: number): T[] {
  x.splice(i, 1);
  return x;
}


/**
 * Remove value at path in a nested array!
 * @param x a nested array (updated!)
 * @param p path
 * @returns x \\: [i₀][i₁][...] | [i₀, i₁, ...] = p
 */
export function removePath$(x: unknown[], p: number[]): unknown[] {
  const y = getPath(x, p.slice(0, -1));
  if (is(y)) y.splice(last(p) as number, 1);
  return x;
}
// #endregion




// #region SORT
// ------------

/**
 * Examine if array is sorted.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x is sorted?
 */
export function isSorted<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  return searchUnsortedValue(x, fc, fm) === -1;
}


/**
 * Examine if array has an unsorted value.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x is not sorted?
 */
export function hasUnsortedValue<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  return searchUnsortedValue(x, fc, fm) >= 0;
}


/**
 * Find first index of an unsorted value.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns index of first unsorted value, -1 if sorted
 */
export function searchUnsortedValue<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const X  = x.length;
  if (X<=1) return -1;
  let w0 = fm(x[0], 0, x);
  for (let i=1; i<X; ++i) {
    const w = fm(x[i], i, x);
    if (fc(w0, w)>0) return i;
    w0 = w;
  }
  return -1;
}


/**
 * Arrange values in order.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @param fs swap function (x, i, j)
 * @returns x' | x' = x; x'[i] ≤ x'[j] ∀ i ≤ j
 */
export function sort<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null, fs: SwapFunction<T> | null=null): T[] {
  return sort$(x.slice(), fc, fm, fs);
}
export {sort as toSorted};


/**
 * Arrange values in order!
 * @param x an array (updated!)
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @param fs swap function (x, i, j)
 * @returns x | x[i] ≤ x[j] ∀ i ≤ j
 */
export function sort$<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null, fs: SwapFunction<T> | null=null): T[] {
  fc = fc || COMPARE;
  if (!fm && !fs) return x.sort(fc);
  const X  = x.length;
  fm = fm || IDENTITY;
  fs = fs || swapRaw$;
  return rangedPartialIntroSort$(x, 0, X, X, fc, fm, fs);
}


/**
 * Arrange a range of values in order.
 * @param x an array
 * @param i begin index
 * @param I end index (exclusive)
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @param fs swap function (x, i, j)
 * @returns x' | x' = x; x'[i] ≤ x'[j] ∀ i ≤ j
 */
export function rangedSort<T, U=T>(x: T[], i: number, I: number, fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null, fs: SwapFunction<T> | null=null): T[] {
  return rangedSort$(x.slice(), i, I, fc, fm, fs);
}


/**
 * Arrange a range of values in order!
 * @param x an array (updated!)
 * @param i begin index
 * @param I end index (exclusive)
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @param fs swap function (x, i, j)
 * @returns x | x[i] ≤ x[j] ∀ i ≤ j
 */
export function rangedSort$<T, U=T>(x: T[], i: number, I: number, fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null, fs: SwapFunction<T> | null=null): T[] {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  fs = fs || swapRaw$;
  [i, I] = indexRange(x, i, I);
  return rangedPartialIntroSort$(x, i, I, I-i, fc, fm, fs);
}


/**
 * Partially arrange values in order.
 * @param x an array
 * @param n minimum number of values to sort
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @param fs swap function (x, i, j)
 * @returns x' | x' = x; x'[i] ≤ x'[j] ∀ i ≤ j
 */
export function partialSort<T, U=T>(x: T[], n: number, fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null, fs: SwapFunction<T> | null=null): T[] {
  return partialSort$(x.slice(), n, fc, fm, fs);
}


/**
 * Partially arrange values in order!
 * @param x an array (updated!)
 * @param n minimum number of values to sort
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @param fs swap function (x, i, j)
 * @returns x | x[i] ≤ x[j] ∀ i ≤ j
 */
export function partialSort$<T, U=T>(x: T[], n: number, fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null, fs: SwapFunction<T> | null=null): T[] {
  return rangedPartialSort$(x, 0, x.length, n, fc, fm, fs);
}


/**
 * Partially arrange a range of values in order.
 * @param x an array
 * @param i begin index
 * @param I end index (exclusive)
 * @param n minimum number of values to sort
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @param fs swap function (x, i, j)
 * @returns x' | x' = x; x'[i] ≤ x'[j] ∀ i ≤ j
 */
export function rangedPartialSort<T, U=T>(x: T[], i: number, I: number, n: number, fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null, fs: SwapFunction<T> | null=null): T[] {
  return rangedPartialSort$(x.slice(), i, I, n, fc, fm, fs);
}


/**
 * Partially arrange a range of values in order!
 * @param x an array (updated!)
 * @param i begin index
 * @param I end index (exclusive)
 * @param n minimum number of values to sort
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @param fs swap function (x, i, j)
 * @returns x | x[i] ≤ x[j] ∀ i ≤ j
 */
export function rangedPartialSort$<T, U=T>(x: T[], i: number, I: number, n: number, fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null, fs: SwapFunction<T> | null=null): T[] {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  fs = fs || swapRaw$;
  [i, I] = indexRange(x, i, I);
  return rangedPartialIntroSort$(x, i, I, n, fc, fm, fs);
}


/**
 * Partially arrange values in order!
 * @param x an array (updated!)
 * @param i begin index
 * @param I end index (exclusive)
 * @param n minimum number of values to sort
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @param fs swap function (x, i, j)
 * @returns x | x[i] ≤ x[j] ∀ i ≤ j
 */
function rangedPartialIntroSort$<T, U=T>(x: T[], i: number, I: number, n: number, fc: CompareFunction<T|U>, fm: MapFunction<T, T|U>, fs: SwapFunction<T>): T[] {
  const d = Math.floor(Math.log2(I-i)*2);  // Maximum depth of recursion
  const s = 16;                            // When to switch to insertion sort
  return rangedPartialIntroSortDo$(x, i, I, d, s, n, fc, fm, fs);
}


// Partially arrange a range of values in order with hybrid quick sort, heap sort, and insertion sort.
function rangedPartialIntroSortDo$<T, U=T>(x: T[], i: number, I: number, d: number, s: number, n: number, fc: CompareFunction<T|U>, fm: MapFunction<T, T|U>, fs: SwapFunction<T>): T[] {
  if (n<=0 || I-i<=1) return x;                     // Nothing to sort
  if (I-i<=s) return rangedPartialInsertionSort$(x, i, I, n, fc, fm, fs);  // Insertion sort
  if (d<=0)   return rangedPartialHeapSort$(x, i, I, n, fc, fm, fs);       // Heap sort
  let p = i + Math.floor((I-i)*Math.random());            // Choose pivot
  p = rangedQuickSortPartition$(x, i, I, p, fc, fm, fs);  // Partition array
  rangedPartialIntroSortDo$(x, i,   p, d, s, Math.min(p-i, n),   fc, fm, fs);  // Sort left part
  rangedPartialIntroSortDo$(x, p+1, I, d, s, Math.min(I-p-1, n), fc, fm, fs);  // Sort right part
  return x;
}


/**
 * Partially arrange a range of values in order!
 * @param x an array (updated!)
 * @param i begin index
 * @param I end index (exclusive)
 * @param n minimum number of values to sort
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @param fs swap function (x, i, j)
 * @returns x | x[i] ≤ x[j] ∀ i ≤ j
 */
function _rangedPartialQuickSort$<T, U=T>(x: T[], i: number, I: number, n: number, fc: CompareFunction<T|U>, fm: MapFunction<T, T|U>, fs: SwapFunction<T>): T[] {
  if (n<=0 || I-i<=1) return x;                         // Nothing to sort
  let p = i + Math.floor((I-i)*Math.random());            // Choose pivot
  p = rangedQuickSortPartition$(x, i, I, p, fc, fm, fs);  // Partition array
  _rangedPartialQuickSort$(x, i,   p, Math.min(p-i, n),   fc, fm, fs);  // Sort left part
  _rangedPartialQuickSort$(x, p+1, I, Math.min(I-p-1, n), fc, fm, fs);  // Sort right part
  return x;
}


// TODO: Make this a generic function.
// Partition the array into two parts, such that values in the first part are less than values in the second part.
function rangedQuickSortPartition$<T, U=T>(x: T[], i: number, I: number, p: number, fc: CompareFunction<T|U>, fm: MapFunction<T, T|U>, fs: SwapFunction<T>): number {
  const wp = fm(x[p], p, x);  // Pivot value
  let j  = i-1;   // Last index of values ≤ pivot
  fs(x, p, I-1);  // Move pivot to end
  for (let k=i; k<I-1; ++k) {
    const wk = fm(x[k], k, x);
    if (fc(wk, wp) > 0) continue;
    fs(x, ++j, k);  // Move value ≤ pivot to left
  }
  fs(x, ++j, I-1);  // Move pivot to middle
  return j;  // Return pivot index
}


/**
 * Partially arrange a range of values in order!
 * @param x an array (updated!)
 * @param i begin index
 * @param I end index (exclusive)
 * @param n minimum number of values to sort
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @param fs swap function (x, i, j)
 * @returns x | x[i] ≤ x[j] ∀ i ≤ j
 */
function rangedPartialHeapSort$<T, U=T>(x: T[], i: number, I: number, n: number, fc: CompareFunction<T|U>, fm: MapFunction<T, T|U>, fs: SwapFunction<T>): T[] {
  rangedBuildReverseMinHeap$(x, i, I, fc, fm, fs);
  for (const r=I-1; n>0 && i<I; ++i, --n) {
    fs(x, i, r);  // Move root to the beginning
    rangedReverseMinHeapify$(x, i+1, I, r, fc, fm, fs);  // Rebuild heap
  }
  return x;
}


// Build a reverse min-heap from a range of values, where root node is the smallest and placed at the end.
function rangedBuildReverseMinHeap$<T, U=T>(x: T[], i: number, I: number, fc: CompareFunction<T|U>, fm: MapFunction<T, T|U>, fs: SwapFunction<T>): void {
  for (let r=I-Math.floor((I-i)/2); r<I; ++r)  // Reverse of r = X/2-1 .. 0
    rangedReverseMinHeapify$(x, i, I, r, fc, fm, fs);
}


/**
 * Reverse min-heapify a range of values, such that root node is the smallest and placed at the end.
 * @param x an array (updated!)
 * @param i begin index
 * @param I end index (exclusive)
 * @param r root index
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @param fs swap function (x, i, j)
 */
function rangedReverseMinHeapify$<T, U=T>(x: T[], i: number, I: number, r: number, fc: CompareFunction<T|U>, fm: MapFunction<T, T|U>, fs: SwapFunction<T>): void {
  let s  = r;         // Index of smallest value
  const lt = 2*r - I;   // Left child,  reverse of lt = 2*r+1
  const rt = lt  - 1;   // Right child, reverse of rt = 2*r+2
  if (lt>=i && fc(fm(x[lt], lt, x), fm(x[s], s, x)) < 0) s = lt;  // Left child is smaller?
  if (rt>=i && fc(fm(x[rt], rt, x), fm(x[s], s, x)) < 0) s = rt;  // Right child is smaller?
  if (s !== r) {     // Smallest is not root?
    fs(x, s, r);     // Swap root with smallest
    rangedReverseMinHeapify$(x, i, I, s, fc, fm, fs);  // Rebuild heap
  }
}


// Build a max-heap from a range of values, where root node is the smallest and placed at the beginning.
function rangedBuildMaxHeap$<T, U=T>(x: T[], i: number, I: number, fc: CompareFunction<T|U>, fm: MapFunction<T, T|U>, fs: SwapFunction<T>): void {
  for (let r=i+Math.floor((I-i)/2)-1; r>=i; --r)
    rangedMaxHeapify$(x, i, I, r, fc, fm, fs);
}


/**
 * Max-heapify a range of values, such that root node is the largest and placed at the beginning.
 * @param x an array (updated!)
 * @param i begin index
 * @param I end index (exclusive)
 * @param r root index
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @param fs swap function (x, i, j)
 */
function rangedMaxHeapify$<T, U=T>(x: T[], i: number, I: number, r: number, fc: CompareFunction<T|U>, fm: MapFunction<T, T|U>, fs: SwapFunction<T>): void {
  let s  = r;         // Index of largest value
  const lt = 2*r - i + 1;  // Left child,  like lt = 2*r+1
  const rt = lt  + 1;      // Right child, like rt = 2*r+2
  if (lt<I && fc(fm(x[lt], lt, x), fm(x[s], s, x)) > 0) s = lt;  // Left child  is larger?
  if (rt<I && fc(fm(x[rt], rt, x), fm(x[s], s, x)) > 0) s = rt;  // Right child is larger?
  if (s !== r) {     // Largest is not root?
    fs(x, s, r);     // Swap root with largest
    rangedMaxHeapify$(x, i, I, s, fc, fm, fs);  // Rebuild heap
  }
}


/**
 * Partially arrange a range of values in order!
 * @param x an array (updated!)
 * @param i begin index
 * @param I end index (exclusive)
 * @param n minimum number of values to sort (ignored)
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @param fs swap function (x, i, j)
 * @returns x | x[i] ≤ x[j] ∀ i ≤ j
 */
function rangedPartialInsertionSort$<T, U=T>(x: T[], i: number, I: number, n: number, fc: CompareFunction<T|U>, fm: MapFunction<T, T|U>, fs: SwapFunction<T>): T[] {
  // NOTE: Insertion sort does not support partial sorting, so we ignore n.
  if (fs===swapRaw$) return rangedPartialInsertionSortSwapless$(x, i, I, n, fc, fm, fs);
  else               return rangedPartialInsertionSortSwap$    (x, i, I, n, fc, fm, fs);
}


// Sort a range of values in order with swap-enabled version of insertion sort.
function rangedPartialInsertionSortSwap$<T, U=T>(x: T[], i: number, I: number, _n: number, fc: CompareFunction<T|U>, fm: MapFunction<T, T|U>, fs: SwapFunction<T>): T[] {
  for (let j=i+1; j<I; ++j) {
    const key  = x[j];
    const wkey = fm(key, j, x);
    for (let k=j-1; k>=i && fc(fm(x[k], k, x), wkey)>0; --k)
      fs(x, k, k+1);
  }
  return x;
}


// Sort a range of values in order with swapless version of insertion sort.
function rangedPartialInsertionSortSwapless$<T, U=T>(x: T[], i: number, I: number, _n: number, fc: CompareFunction<T|U>, fm: MapFunction<T, T|U>, _fs: SwapFunction<T>): T[] {
  for (let j=i+1; j<I; ++j) {
    const key  = x[j];
    const wkey = fm(key, j, x);
    let k = j-1;
    for (; k>=i && fc(fm(x[k], k, x), wkey)>0; --k)
      x[k+1] = x[k];
    x[k+1] = key;
  }
  return x;
}


/**
 * Partially arrange a range of values in order!
 * @param x an array (updated!)
 * @param i begin index
 * @param I end index (exclusive)
 * @param n minimum number of values to sort
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @param fs swap function (x, i, j)
 * @returns x | x[i] ≤ x[j] ∀ i ≤ j
 */
function _rangedPartialSelectionSort$<T, U=T>(x: T[], i: number, I: number, n: number, fc: CompareFunction<T|U>, fm: MapFunction<T, T|U>, fs: SwapFunction<T>): T[] {
  for (let j=i; n>0 && j<I; ++j, --n) {
    let l  = j;
    let wl = fm(x[l], l, x);
    for (let k=j+1; k<I; ++k) {
      const wk = fm(x[k], k, x);
      if (fc(wl, wk) > 0) { l = k; wl = wk; }
    }
    fs(x, j, l);
  }
  return x;
}
// #endregion




// #region MINIMUM/MAXIMUM
// -----------------------

/**
 * Find first smallest value.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns v | v ≤ vᵢ; vᵢ ∈ x
 */
export function minimum<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T {
  const i = searchMinimumValue(x, fc, fm);
  return x[i];
}
export {minimum as min};


/**
 * Find first smallest entry.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns [min_index, min_value]
 */
export function minimumEntry<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): [number, T] {
  const i = searchMinimumValue(x, fc, fm);
  return [i, x[i]];
}
export {minimumEntry as minEntry};


/**
 * Find first largest value.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns v | v ≥ vᵢ; vᵢ ∈ x
 */
export function maximum<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T {
  const i = searchMaximumValue(x, fc, fm);
  return x[i];
}
export {maximum as max};


/**
 * Find first largest entry.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns [max_index, max_value]
 */
export function maximumEntry<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): [number, T] {
  const i = searchMaximumValue(x, fc, fm);
  return [i, x[i]];
}
export {maximumEntry as maxEntry};


/**
 * Find smallest and largest values.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns [min_value, max_value]
 */
export function range<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): [T | undefined, T | undefined] {
  const [a, b] = rangeEntries(x, fc, fm);
  return [a[1], b[1]];
}


/**
 * Find smallest and largest entries.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns [min_entry, max_entry]
 */
export function rangeEntries<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): [[number, T | undefined], [number, T | undefined]] {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const X  = x.length;
  if (X===0) return [[-1, undefined], [-1, undefined]];
  let v  = x[0], w = fm(v, 0, x);
  let mi = 0, mv = v, mw = w;
  let ni = 0, nv = v, nw = w;
  for (let i=1; i<X; ++i) {
    v = x[i]; w = fm(v, i, x);
    if (fc(w, mw)<0) { mi = i; mv = v; mw = w; }
    if (fc(w, nw)>0) { ni = i; nv = v; nw = w; }
  }
  return [[mi, mv], [ni, nv]];
}


/**
 * Find smallest values.
 * @param x an array
 * @param n number of values
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns n smallest values in ascending order
 */
export function minimums<T, U=T>(x: T[], n: number, fc: CompareFunction<number|T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  const is = searchMinimumValues(x, n, fc, fm);
  return is.map(i => x[i]);
}


/**
 * Find smallest entries.
 * @param x an array
 * @param n number of values
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns n smallest entries in ascending order
 */
export function minimumEntries<T, U=T>(x: T[], n: number, fc: CompareFunction<number|T|U> | null=null, fm: MapFunction<T, T|U> | null=null): [number, T][] {
  const is = searchMinimumValues(x, n, fc, fm);
  return is.map(i => [i, x[i]]);
}


/**
 * Find largest values.
 * @param x an array
 * @param n number of values
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns n largest values in descending order
 */
export function maximums<T, U=T>(x: T[], n: number, fc: CompareFunction<number|T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  const is = searchMaximumValues(x, n, fc, fm);
  return is.map(i => x[i]);
}


/**
 * Find largest entries.
 * @param x an array
 * @param n number of values
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns n largest entries in descending order
 */
export function maximumEntries<T, U=T>(x: T[], n: number, fc: CompareFunction<number|T|U> | null=null, fm: MapFunction<T, T|U> | null=null): [number, T][] {
  const is = searchMaximumValues(x, n, fc, fm);
  return is.map(i => [i, x[i]]);
}


/**
 * Find first index of minimum value.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns first index of minimum value, -1 if empty
 */
export function searchMinimumValue<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const X  = x.length;
  if (X===0) return -1;
  let mi = 0, mw = fm(x[0], 0, x);
  for (let i=1; i<X; ++i) {
    const w = fm(x[i], i, x);
    if (fc(w, mw)<0) { mi = i; mw = w; }
  }
  return mi;
}


/**
 * Find first index of maximum value.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns first index of maximum value, -1 if empty
 */
export function searchMaximumValue<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const X  = x.length;
  if (X===0) return -1;
  let ni = 0, nw = fm(x[0], 0, x);
  for (let i=1; i<X; ++i) {
    const w = fm(x[i], i, x);
    if (fc(w, nw)>0) { ni = i; nw = w; }
  }
  return ni;
}


/**
 * Find indices of minimum values.
 * @param x an array
 * @param n number of values
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns indices of minimum values in ascending order
 */
export function searchMinimumValues<T, U=T>(x: T[], n: number, fc: CompareFunction<number|T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number[] {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const X  = x.length;
  // Create a max heap of indices.
  const IH = Math.min(n, X);
  const ih = fromRange(0, IH);
  rangedBuildMaxHeap$(ih, 0, IH, fc, i => fm(x[i], i, x), swapRaw$);
  let wr = fm(x[ih[0]], ih[0], x);
  // Search for minimum values, and update heap.
  for (let i=n; i<X; ++i) {
    const w = fm(x[i], i, x);
    if (fc(w, wr) >= 0) continue;
    ih[0] = i;
    rangedMaxHeapify$(ih, 0, IH, 0, fc, i => fm(x[i], i, x), swapRaw$);
    wr = fm(x[ih[0]], ih[0], x);
  }
  // Sort max heap in ascending order.
  ih.sort((i, j) => fc(fm(x[i], i, x), fm(x[j], j, x)));
  return ih;
}


/**
 * Find indices of maximum values.
 * @param x an array
 * @param n number of values
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns indices of maximum values in descending order
 */
export function searchMaximumValues<T, U=T>(x: T[], n: number, fc: CompareFunction<number|T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number[] {
  fc = fc || COMPARE;
  const fd = (a: number|T|U, b: number|T|U) => -fc(a, b);
  return searchMinimumValues(x, n, fd, fm);
}
// #endregion




// #region COMPARE
// ---------------

/**
 * Examine if two arrays are equal.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x = y?
 */
export function isEqual<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  const X = x.length, Y = y.length;
  return X===Y && compare(x, y, fc, fm)===0;
}


/**
 * Compare two arrays (lexicographically).
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x<y: -ve, x=y: 0, x>y: +ve
 */
export function compare<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const X  = x.length;
  const Y  = y.length;
  for (let i=0, I=Math.min(X, Y); i<I; ++i) {
    const wx = fm(x[i], i, x);
    const wy = fm(y[i], i, y);
    const c  = fc(wx, wy);
    if (c!==0) return c;
  }
  return Math.sign(X-Y);
}
// #endregion




// #region PART
// ------------

/**
 * Get first value.
 * @param x an array
 * @param vd default value
 * @returns x[0] || vd
 */
export function head<T>(x: T[], vd?: T): T | undefined {
  return x.length>0? x[0] : vd;
}
export {head as front};
export {head as first};


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
 * Get last value.
 * @param x an array
 * @param vd default value
 * @returns x[|x|-1] || vd
 */
export function last<T>(x: T[], vd?: T): T | undefined {
  return x.length>0? x[x.length-1] : vd;
}
export {last as back};


/**
 * Get values from middle.
 * @param x an array
 * @param i begin index
 * @param n number of values [1]
 * @returns x[i..i+n]
 */
export function middle<T>(x: T[], i: number, n: number=1): T[] {
  i = index(x, i);
  n = Math.max(n, 0);
  return x.slice(i, i+n);
}


/**
 * Get part of an array.
 * @param x an array
 * @param i begin index [0]
 * @param I end index [|x|]
 * @returns x[i..I]
 */
export function slice<T>(x: T[], i: number=0, I: number=x.length): T[] {
  return x.slice(i, I);
}


/**
 * Get part of an array!
 * @param x an array (updated!)
 * @param i begin index [0]
 * @param I end index [|x|]
 * @returns x = x[i..I]
 */
export function slice$<T>(x: T[], i: number=0, I: number=x.length): T[] {
  x.copyWithin(0, i, I);
  x.length = length(x, i, I);
  return x;
}
// #endregion




// #region SEARCH VALUE
// --------------------

/**
 * Check if array has a value.
 * @param x an array
 * @param v search value
 * @param i begin index [0]
 * @returns v ∈ x[i..]?
 */
export function includes<T>(x: T[], v: T, i: number=0): boolean {
  return x.includes(v, i);
}


/**
 * Examine if array has a value.
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
 * Find first index of a value.
 * @param x an array
 * @param v search value
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns first index of value, -1 if not found
 */
export function searchValue<T, U=T>(x: T[], v: T, fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const w  = fm(v, 0, null); let i = -1;
  for (const vx of x) {
    const wx = fm(vx, ++i, x);
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
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const w = fm(v, 0, null);
  for (let i=x.length-1; i>=0; --i) {
    const wx = fm(x[i], i, x);
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
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const w = fm(v, 0, null);
  let i = -1; const a = [];
  for (const vx of x) {
    const wx = fm(vx, ++i, x);
    if (fc(wx, w)===0) a.push(i);
  }
  return a;
}


/**
 * Find first index of an adjacent duplicate value.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns index of first adjacent duplicate value, -1 if none
 */
export function searchAdjacentDuplicateValue<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const X  = x.length;
  if (X<=1) return -1;
  let w0 = fm(x[0], 0, x);
  for (let i=1; i<X; ++i) {
    const w = fm(x[i], i, x);
    if (fc(w0, w)===0) return i;
    w0 = w;
  }
  return -1;
}
export {searchAdjacentDuplicateValue as searchAdjacentDuplicate};


/**
 * Find first index where two arrays differ.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns first index where x[i] ≠ y[i], or -1
 */
export function searchMismatchedValue<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const X = x.length;
  const Y = y.length;
  const I = Math.min(X, Y);
  for (let i=0; i<I; ++i) {
    const wx = fm(x[i], i, x);
    const wy = fm(y[i], i, y);
    if (fc(wx, wy)!==0) return i;
  }
  return X===Y? -1 : I;
}
export {searchMismatchedValue as searchMismatch};
// #endregion




// #region ARRANGEMENTS
// --------------------

/**
 * Examine if array starts with a prefix.
 * @param x an array
 * @param y search prefix
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x[0..|y|] = y?
 */
export function hasPrefix<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  const Y = y.length;
  return Y===0 || compare(x.slice(0, Y), y, fc, fm)===0;
}
export {hasPrefix as startsWith};


/**
 * Examine if array ends with a suffix.
 * @param x an array
 * @param y search suffix
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x[|x|-|y|..] = y?
 */
export function hasSuffix<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  const Y = y.length;
  return Y===0 || compare(x.slice(-Y), y, fc, fm)===0;
}
export {hasSuffix as endsWith};


/**
 * Examine if array contains an infix.
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
 * Examine if array has a subsequence.
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
 * Examine if array has a permutation.
 * @param x an array
 * @param y search permutation
 * @param fc map function (v, i, x)
 * @param fm compare function (a, b)
 * @returns x contains a shuffled version of y?
 */
export function hasPermutation<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  const x1 = fm? x.map(fm) : x.slice();
  const y1 = fm? y.map(fm) : y.slice();
  return hasSubsequence<T|U>(x1.sort(), y1.sort(), fc);
  // return hasSubsequence<T|U>(x1.sort(), y1.sort(), fc, fm);
}


/**
 * Obtain all possible prefixes.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @returns [[], x[..1], x[..2], ...] if n<0; [x[..n]] otherwise
 */
export function prefixes<T>(x: T[], n: number=-1): T[][] {
  return [...iprefixes(x, n)];
}


/**
 * List all possible prefixes.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @returns [], x[..1], x[..2], ... if n<0; x[..n] otherwise
 */
export function* iprefixes<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  const X = x.length;
  if (n>X)  return;
  if (n>=0) { yield x.slice(0, n); return; }
  for (let i=0; i<=X; ++i)
    yield x.slice(0, i);
}


/**
 * Obtain all possible suffixes.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @returns [x[0..], x[1..], x[2..], ...] if n<0; [x[-n..]] otherwise
 */
export function suffixes<T>(x: T[], n: number=-1): T[][] {
  return [...isuffixes(x, n)];
}


/**
 * List all possible suffixes.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @returns x[0..], x[1..], x[2..], ... if n<0; x[-n..] otherwise
 */
export function* isuffixes<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  const X = x.length;
  if (n>X)  return;
  if (n>=0) { yield x.slice(x.length - n); return; }
  for (let i=0; i<=X; ++i)
    yield x.slice(i);
}


/**
 * Obtain all possible infixes.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @returns [[], x[0..1], x[0..2], ..., x[1..2], ...] if n<0; [only of length n] otherwise
 */
export function infixes<T>(x: T[], n: number=-1): T[][] {
  return [...iinfixes(x, n)];
}


/**
 * List all possible infixes.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @returns [], x[0..1], x[0..2], ..., x[1..2], ... if n<0; only of length n otherwise
 */
export function iinfixes<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  if (n>=0) return infixesFixed(x, n);
  else      return infixesAll(x);
}

function* infixesFixed<T>(x: T[], n: number): IterableIterator<T[]> {
  const X = x.length;
  if (n>X)   return;
  if (n===0) { yield []; return; }
  for (let i=0, I=X-n+1; i<I; ++i)
    yield x.slice(i, i+n);
}

function* infixesAll<T>(x: T[]): IterableIterator<T[]> {
  const X = x.length; yield [];
  for (let i=0; i<X; ++i) {
    for (let j=i+1; j<=X; ++j)
      yield x.slice(i, j);
  }
}


/**
 * Obtain all possible subsequences.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @returns [elements selected by bit from 0..2^|x|] if n<0; [only of length n] otherwise
 */
export function subsequences<T>(x: T[], n: number=-1): T[][] {
  return [...isubsequences(x, n)];
}


/**
 * List all possible subsequences.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @returns elements selected by bit from 0..2^|x| if n<0; only of length n otherwise
 */
export function* isubsequences<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  const X = x.length;
  if (n>X) return;
  if (n===X)          { yield x;  return; }
  if (n===0 || X===0) { yield []; return; }
  const y = x.slice(0, -1);
  yield* isubsequences(y, n);
  for (const s of isubsequences(y, n-1)) {
    s.push(x[X-1]);
    yield s;
  }
}


/**
 * Obtain all possible permutations.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @returns [[], arrangements of length 1, of length 2, ...] if n<0; [only of length n] otherwise
 */
export function permutations<T>(x: T[], n: number=-1): T[][] {
  return [...ipermutations(x, n)];
}


/**
 * List all possible permutations.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @returns [], arrangements of length 1, of length 2, ... if n<0; only of length n otherwise
 */
export function* ipermutations<T>(x: T[], n: number=-1): IterableIterator<T[]> {
  const X = x.length;
  if (n>X) return;
  let   i = n<0? 0 : n;
  const I = n<0? X : n
  for (; i<=I; ++i)
    yield* ipermutationsFixed(x, i);
}

function* ipermutationsFixed<T>(x: T[], n: number): IterableIterator<T[]> {
  const X = x.length;
  if (X===0 || n===0) { yield []; return; }
  for (let i=0; i<X; ++i) {
    const y = splice(x, i, 1);
    for (const p of ipermutationsFixed(y, n-1))
      yield [x[i], ...p];
  }
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
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const X = x.length, Y = y.length;
  for (let i=0; i<=X-Y; ++i)
    if (isInfixAt(x, y, i, fc, fm)) return i;
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
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const X = x.length, Y = y.length;
  for (let i=X-Y; i>=0; --i)
    if (isInfixAt(x, y, i, fc, fm)) return i;
  return -1;
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
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const X = x.length, Y = y.length, a = [];
  for (let i=0; i<=X-Y; ++i)
    if (isInfixAt(x, y, i, fc, fm)) a.push(i);
  return a;
}


function isInfixAt<T, U=T>(x: T[], y: T[], i: number, fc: CompareFunction<T|U>, fm: MapFunction<T, T|U>): boolean {
  const Y = y.length;
  for (let j=0; j<Y; ++j) {
    const wx = fm(x[i+j], i+j, x);
    const wy = fm(y[j], j, y);
    if (fc(wx, wy)!==0) return false;
  }
  return true;
}


/**
 * Find first index of a subsequence.
 * @param x an array
 * @param y search subsequence
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns begin index of subsequence, -1 if not found
 */
export function searchSubsequence<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const y1 = [...y].map(fm), Y = y1.length;
  let a = -1, i = -1, j = 0;
  for (const vx of x) {
    const wx = fm(vx, ++i, x);
    if (fc(wx, y1[j])!==0) continue;
    if (a<0) a = i;
    if (++j>=Y) return a;
  }
  return -1;
}
// #endregion




// #region RANDOM ARRANGEMENTS
// ---------------------------

/**
 * Pick an arbitrary value.
 * @param x an array
 * @param fr random number generator ([0, 1))
 * @returns x[i] | i ∈ 0..|x|
 */
export function randomValue<T>(x: T[], fr: ReadFunction<number> | null=Math.random): T {
  fr = fr || Math.random;
  const i = Math.floor(fr() * x.length);
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
export function randomPrefix<T>(x: T[], n: number=-1, fr: ReadFunction<number> | null=Math.random): T[] | null {
  fr = fr || Math.random;
  const X = x.length;
  if (n>X) return null;
  n = n>=0? n : Math.floor((X+1)*fr());
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
export function randomSuffix<T>(x: T[], n: number=-1, fr: ReadFunction<number> | null=Math.random): T[] | null {
  const X = x.length;
  if (n>X) return null;
  n = n>=0? n : Math.floor((X+1)*(fr as ReadFunction<number>)());
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
export function randomInfix<T>(x: T[], n: number=-1, fr: ReadFunction<number> | null=Math.random): T[] | null {
  const X = x.length;
  if (n>X) return null;
  n = n>=0? n : randomInfixLength(X, (fr as ReadFunction<number>)());
  const i = Math.floor((X+1-n)*(fr as ReadFunction<number>)());
  return x.slice(i, i+n);
}
export {randomInfix as infix};  // DEPRECATED

// Not all infix lengths are equally proable.
function randomInfixLength(X: number, r: number): number {
  const C = 0.5 * X*(X+1) + 1;
  const n = 0.5 * Math.sqrt(1 + 8*r*C) - 0.5;
  return X+1  - Math.floor(n+1);
}


/**
 * Pick an arbitrary subsequence.
 * @param x an array
 * @param n number of values [-1 ⇒ any]
 * @param fr random number generator ([0, 1))
 * @returns x[i, j, ...] | [i, j, ...] = is; |is| = |x| if n<0 else n
 */
export function randomSubsequence<T>(x: T[], n: number=-1, fr: ReadFunction<number> | null=Math.random): T[] | null {
  const X = x.length;
  if (n>X)  return null;
  if (n>=0) return randomSubsequenceFixed(x, n, fr as ReadFunction<number>);
  else      return randomSubsequenceAll(x, fr as ReadFunction<number>);
}
export {randomSubsequence as subsequence};  // DEPRECATED

function randomSubsequenceFixed<T>(x: T[], n: number, fr: ReadFunction<number>): T[] {
  const is = fromRange(0, x.length);
  randomPermutation$(is, n, fr).sort();
  return getAll(x, is);
}

function randomSubsequenceAll<T>(x: T[], fr: ReadFunction<number>): T[] {
  const a: T[] = [];
  for (const v of x)
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
export function randomPermutation<T>(x: T[], n: number=-1, fr: ReadFunction<number> | null=Math.random): T[] | null {
  const X = x.length;
  if (n>X) return null;
  return randomPermutation$(x.slice(), n, fr);
}
export {randomPermutation as permutation};  // DEPRECATED


/**
 * Pick an arbitrary permutation!
 * @param x an array (updated!)
 * @param n number of values [-1 ⇒ any]
 * @param fr random number generator ([0, 1))
 * @returns x | values are randomly shuffled
 */
export function randomPermutation$<T>(x: T[], n: number=-1, fr: ReadFunction<number> | null=Math.random): T[] {
  fr = fr || Math.random;
  const X = x.length;
  if (n>X) return x;
  n = n>=0? n : Math.floor((X+1)*fr());
  for (let i=0; i<n; ++i) {
    const j = i + Math.floor((X-i)*fr());
    const t = x[i]; x[i] = x[j]; x[j] = t;
  }
  x.length = n;
  return x;
}
export {randomPermutation$ as permutation$};  // DEPRECATED
export {randomPermutation$ as permute$};
export {randomPermutation$ as shuffle$};
// - https://en.wikipedia.org/wiki/Fisher–Yates_shuffle
// #endregion




// #region FIND
// ------------

/**
 * Find first value passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns first v | ft(v) = true; v ∈ x
 */
export function find<T>(x: T[], ft: TestFunction<T>): T {
  return x.find(ft) as T;
}


/**
 * Find last value passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns last v | ft(v) = true; v ∈ x
 */
export function findRight<T>(x: T[], ft: TestFunction<T>): T {
  for (let i=x.length-1; i>=0; --i)
    if (ft(x[i], i, x)) return x[i];
  return undefined as unknown as T;
}
// #endregion




// #region TAKE/DROP
// -----------------

/**
 * Keep first n values only.
 * @param x an array
 * @param n number of values [1]
 * @returns x[0..n]
 */
export function take<T>(x: T[], n: number=1): T[] {
  n = Math.max(n, 0);
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
  const X = x.length;
  n = Math.min(Math.max(n, 0), X);
  return x.slice(X-n);
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
  n = Math.max(n, 0);
  return x.slice(n);
}


/**
 * Discard last n values only.
 * @param x an array
 * @param n number of values [1]
 * @returns x[0..-n]
 */
export function dropRight<T>(x: T[], n: number=1): T[] {
  const X = x.length;
  n = Math.min(Math.max(n, 0), X);
  return x.slice(0, X-n);
}


/**
 * Discard values from left, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns x[T..] | ft(x[i]) = true ∀ i ∈ [0, T-1] & ft(x[T]) = false
 */
export function dropWhile<T>(x: T[], ft: TestFunction<T>): T[] {
  return x.slice(scanWhile(x, ft));
}


/**
 * Discard values from right, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns x[0..T-1] | ft(x[i]) = true ∀ i ∈ [T, |x|-1] & ft(x[T-1]) = false
 */
export function dropWhileRight<T>(x: T[], ft: TestFunction<T>): T[] {
  return x.slice(0, scanWhileRight(x, ft));
}
// #endregion




// #region SCAN
// ------------

/**
 * Scan from left, while a test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns first index where test fails
 */
export function scanWhile<T>(x: T[], ft: TestFunction<T>): number {
  let i = -1;
  for (const v of x)
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
  let i = x.length-1;
  for (; i>=0; --i)
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
  let i = -1;
  for (const v of x)
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
  let i = x.length-1;
  for (; i>=0; --i)
    if (ft(x[i], i, x)) break;
  return ++i;
}
// #endregion




// #region SEARCH
// --------------

/**
 * Find first index of a value.
 * @param x an array
 * @param v search value
 * @param i begin index [0]
 * @returns index of v in x[i..] if found else -1
 */
export function indexOf<T>(x: T[], v: T, i: number=0): number {
  return x.indexOf(v, i);
}


/**
 * Find last index of a value.
 * @param x an array
 * @param v search value
 * @param i begin index [|x|-1]
 * @returns last index of v in x[0..i] if found else -1
 */
export function lastIndexOf<T>(x: T[], v: T, i: number=x.length-1): number {
  return x.lastIndexOf(v, i);
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
export {search as findIndex};


/**
 * Find index of last value passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns last index of value, -1 if not found
 */
export function searchRight<T>(x: T[], ft: TestFunction<T>): number {
  for (let i=x.length-1; i>=0; --i)
    if (ft(x[i], i, x)) return i;
  return -1;
}
export {searchRight as findLastIndex};


/**
 * Find indices of values passing a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns indices of value
 */
export function searchAll<T>(x: T[], ft: TestFunction<T>): number[] {
  let i = -1;
  const a: number[] = [];
  for (const v of x)
    if (ft(v, ++i, x)) a.push(i);
  return a;
}
// #endregion




// #region FUNCTIONAL
// ------------------

/**
 * Call a function for each value.
 * @param x an array
 * @param fp process function (v, i, x)
 */
export function forEach<T>(x: T[], fp: ProcessFunction<T>): void {
  x.forEach(fp);
}


/**
 * Examine if any value satisfies a test.
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
  const I = x.length;
  for (let i=0; i<I; ++i)
    if (x[i]) return true;
  return false;
}


/**
 * Examine if all values satisfy a test.
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
  const I = x.length;
  for (let i=0; i<I; ++i)
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
 * Transform values of an array!
 * @param x an array (updated!)
 * @param fm map function (v, i, x)
 * @returns x = [fm(v₀), fm(v₁), ...]; vᵢ ∈ x
 */
export function map$<T>(x: T[], fm: MapFunction<T, T>): T[] {
  const I = x.length;
  for (let i=0; i<I; ++i)
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
  const init = arguments.length <= 2;
  return init? x.reduce(fr as ReduceFunction<T, T>) : x.reduce(fr as ReduceFunction<T, T>, acc as T);
}


/**
 * Reduce values from right, to a single value.
 * @param x an array
 * @param fr reduce function (acc, v, i, x)
 * @param acc initial value
 * @returns fr(fr(acc, vₓ₋₀), vₓ₋₁)... | fr(acc, vₓ₋₀) = vₓ₋₀ if acc not given
 */
export function reduceRight<T, U=T>(x: T[], fr: ReduceFunction<T, T|U>, acc?: T|U): T|U {
  let init = arguments.length <= 2;
  for (let i=x.length-1; i>=0; --i) {
    if (init)  { acc = x[i]; init = false; }
    else acc = fr(acc as T | U, x[i], i, x);
  }
  return acc as T | U;
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
 * Keep values which pass a test!
 * @param x an array (updated!)
 * @param ft test function (v, i, x)
 * @returns x = [v₀, v₁, ...] | ft(vᵢ) = true; vᵢ ∈ x
 */
export function filter$<T>(x: T[], ft: TestFunction<T>): T[] {
  const I = x.length;
  let j = 0;
  for (let i=0; i<I; ++i)
    if (ft(x[i], i, x)) x[j++] = x[i];
  x.length = j;
  return x;
}


/**
 * Keep values at given indices.
 * @param x an array
 * @param is indices
 * @returns v₀, v₁, ... | vᵢ = x[i]; i ∈ is
 */
export function filterAt<T>(x: T[], is: number[]): T[] {
  const X = x.length;
  const a: T[] = [];
  for (const i of is)
    if (i>=0 && i<X) a.push(x[i]);
  return a;
}


/**
 * Discard values which pass a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns [v₀, v₁, ...] | ft(vᵢ) = false; vᵢ ∈ x
 */
export function reject<T>(x: T[], ft: TestFunction<T>): T[] {
  let i = -1;
  const a: T[] = [];
  for (const v of x)
    if (!ft(v, ++i, x)) a.push(v);
  return a;
}


/**
 * Discard values which pass a test!
 * @param x an array (updated!)
 * @param ft test function (v, i, x)
 * @returns x = [v₀, v₁, ...] | ft(vᵢ) = false; vᵢ ∈ x
 */
export function reject$<T>(x: T[], ft: TestFunction<T>): T[] {
  const I = x.length;
  let j = 0;
  for (let i=0; i<I; ++i)
    if (!ft(x[i], i, x)) x[j++] = x[i];
  x.length = j;
  return x;
}


/**
 * Discard values at given indices.
 * @param x an array
 * @param is indices
 * @returns [v₀, v₁, ...] | vᵢ = x[i]; i ∉ is
 */
export function rejectAt<T>(x: T[], is: number[]): T[] {
  let i = -1;
  const a: T[] = [];
  for (const v of x)
    if (!is.includes(++i)) a.push(v);
  return a;
}
// #endregion




// #region FLATTEN
// ---------------

/**
 * Flatten nested array to given depth.
 * @param x a nested array
 * @param n maximum depth [-1 ⇒ all]
 * @param fm map function (v, i, x)
 * @param ft flatten test function (v, i, x) [is]
 * @returns flat iterable
 */
export function flat(x: unknown[], n: number=-1, fm: MapFunction<unknown, unknown> | null=null, ft: TestFunction<unknown> | null=null): unknown[] {
  fm = fm || IDENTITY;
  ft = ft || is;
  return flatTo$([], x, n, fm, ft);
}

function flatTo$(a: unknown[], x: unknown[], n: number, fm: MapFunction<unknown, unknown>, ft: TestFunction<unknown>): unknown[] {
  let i = -1;
  for (const v of x) {
    const w = fm(v, ++i, x);
    if (n!==0 && ft(w, i, x)) flatTo$(a, v as unknown[], n-1, fm, ft);
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
export function flatMap(x: unknown[], fm: MapFunction<unknown, unknown> | null=null, ft: TestFunction<unknown> | null=null): unknown[] {
  fm = fm || IDENTITY;
  ft = ft || is;
  let i = -1;
  const a: unknown[] = [];
  for (const v of x) {
    const w = fm(v, ++i, x);
    if (ft(w, i, x)) concat$(a, w as Iterable<unknown>);
    else a.push(w);
  }
  return a;
}
// #endregion




// #region PREFIX SUM
// ------------------

/**
 * Perform exclusive prefix scan from left to right.
 * @param x an array
 * @param fr reduce function (acc, v, i, x)
 * @param acc initial value
 * @returns [acc, fr(acc, v₀), fr(fr(acc, v₀), v₁)...]
 */
export function exclusiveScan<T, U=T>(x: T[], fr: ReduceFunction<T, T|U>, acc: T|U): (T|U)[] {
  const a: (T|U)[] = [];
  const I = x.length;
  for (let i=0; i<I; ++i) {
    a.push(acc);
    acc = fr(acc, x[i], i, x);
  }
  return a;
}


/**
 * Perform exclusive prefix scan from left to right!
 * @param x an array (updated!)
 * @param fr reduce function (acc, v, i, x)
 * @param acc initial value
 * @returns x = [acc, fr(acc, v₀), fr(fr(acc, v₀), v₁)...]
 */
export function exclusiveScan$<T>(x: T[], fr: ReduceFunction<T, T>, acc: T): T[] {
  const I = x.length;
  for (let i=0; i<I; ++i) {
    const v = x[i];
    x[i] = acc;
    acc = fr(acc, v, i, x);
  }
  return x;
}


/**
 * Perform inclusive prefix scan from left to right.
 * @param x an array
 * @param fr reduce function (acc, v, i, x)
 * @param acc initial value
 * @returns [fr(acc, v₀), fr(fr(acc, v₀), v₁)...]
 */
export function inclusiveScan<T, U=T>(x: T[], fr: ReduceFunction<T, T|U>, acc?: T|U): (T|U)[] {
  let init = arguments.length <= 2;
  const a: (T|U)[] = [];
  const I = x.length;
  for (let i=0; i<I; ++i) {
    acc = init? x[i] : fr(acc as T|U, x[i], i, x);
    a.push(acc);
    init = false;
  }
  return a;
}
export {inclusiveScan as accumulate};


/**
 * Perform inclusive prefix scan from left to right!
 * @param x an array (updated!)
 * @param fr reduce function (acc, v, i, x)
 * @param acc initial value
 * @returns x = [fr(acc, v₀), fr(fr(acc, v₀), v₁)...]
 */
export function inclusiveScan$<T>(x: T[], fr: ReduceFunction<T, T>, acc: T): T[] {
  const I = x.length;
  for (let i=0; i<I; ++i)
    acc = x[i] = fr(acc, x[i], i, x);
  return x;
}


/**
 * Combine adjacent values of an array.
 * @param x an array
 * @param fc combine function (u, v)
 * @param acc initial value
 * @returns [fc(acc, v₀), fc(v₀, v₁)...] | vᵢ ∈ x
 */
export function adjacentCombine<T>(x: T[], fc: CombineFunction<T>, acc: T): T[] {
  const a: T[] = [];
  if (x.length>0) a.push(fc(acc, x[0]));
  const I = x.length;
  for (let i=1; i<I; ++i)
    a.push(fc(x[i-1], x[i]));
  return a;
}
// adjacentMap()?


/**
 * Combine adjacent values of an array!
 * @param x an array (updated!)
 * @param fc combine function (u, v)
 * @param acc initial value
 * @returns x = [fc(acc, v₀), fc(v₀, v₁)...] | vᵢ ∈ x
 */
export function adjacentCombine$<T>(x: T[], fc: CombineFunction<T>, acc: T): T[] {
  const X = x.length;
  if (X===0) return x;
  let v = x[0];
  x[0]  = fc(acc, v);
  for (let i=1; i<X; ++i) {
    const w = x[i];
    x[i]  = fc(v, w);
    v = w;
  }
  return x;
}
// #endregion




// #region COMBINE
// ---------------

/**
 * Place a separator between every value.
 * @param x an array
 * @param v separator
 * @returns [x[0], v, x[1], v, ..., x[|x|-1]]
 */
export function intersperse<T>(x: T[], v: T): T[] {
  const a: T[] = []; let i = -1;
  for (const u of x) {
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
  const a = [];
  let u: T = undefined as T;
  let i = -1;
  for (const v of x) {
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
 * @returns x[0..m] ⧺ y[0..n] ⧺ x[s..s+m] ⧺ y[t..t+n] ⧺ ... ⧺ x[k*s..|x|-1] | k ∈ W
 */
export function intermix<T>(x: T[], y: T[], m: number=1, n: number=1, s: number=m, t: number=n): T[] {
  const X = x.length;
  const Y = y.length;
  const a: T[] = [];
  m = Math.max(m, 0);
  n = Math.max(n, 0);
  s = Math.max(s, 1);
  t = Math.max(t, 1);
  for (let i=0, j=0; i<X; i+=s) {
    if (i>0) {
      for (let k=j, K=k+n; k<K; ++k)
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
 * @returns [x₀[0], x₁[0], ..., x₀[1], x₁[0], ...] | [x₀, x₁, ...] = xs
 */
export function interleave<T>(xs: T[][]): T[] {
  const a: T[] = [];
  for (let i=0;; ++i) {
    let n = 0;
    for (const x of xs)
      if (i<x.length) { a.push(x[i]); ++n; }
    if (n===0) break;
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
export function zip<T, U=T[]>(xs: T[][], fm: MapFunction<T[], T[]|U> | null=null, fe: EndFunction | null=null, vd?: T): (T[]|U)[] {
  fm = fm || IDENTITY;
  fe = fe || some as EndFunction;
  const X = xs.length, a: (T[]|U)[] = [];
  if (X===0) return a;
  const ds = new Array(X).fill(false);
  const ls = xs.map(x => x.length);
  for (let i=0;; ++i) {
    const vs: T[] = [];
    for (let j=0; j<X; ++j) {
      ds[j] = i>=ls[j];
      vs[j] = ds[j]? vd as T : xs[j][i];
    }
    if (fe(ds)) break;
    a.push(fm(vs, i, null));
  }
  return a;
}


// TODO: zip2()?
// #endregion




// #region MANIPULATION
// --------------------

/**
 * Fill with given value.
 * @param x an array
 * @param v value
 * @param i begin index [0]
 * @param I end index [|x|]
 * @returns x' | x' = x; x'[i..I] = v
 */
export function fill<T>(x: T[], v: T, i: number=0, I: number=x.length): T[] {
  return x.slice().fill(v, i, I);
}


/**
 * Fill with given value!
 * @param x an array (updated!)
 * @param v value
 * @param i begin index [0]
 * @param I end index [|x|]
 * @returns x | x[i..I] = v
 */
export function fill$<T>(x: T[], v: T, i: number=0, I: number=x.length): T[] {
  return x.fill(v, i, I);
}


/**
 * Add value to the end.
 * @param x an array
 * @param vs values to add
 * @returns x ⧺ vs
 */
export function push<T>(x: T[], ...vs: T[]): T[] {
  return x.concat(vs);
}
export {push as pushBack};
export {push as append};


/**
 * Add values to the end!
 * @param x an array (updated!)
 * @param vs values to add
 * @returns x = x ⧺ vs
 */
export function push$<T>(x: T[], ...vs: T[]): T[] {
  x.push(...vs);
  return x;
}
export {push$ as pushBack$};
export {push$ as append$};


/**
 * Remove last value.
 * @param x an array
 * @returns x[0..|x|-1]
 */
export function pop<T>(x: T[]): T[] {
  return x.slice(0, -1);
}
export {pop as popBack};


/**
 * Remove last value!
 * @param x an array (updated!)
 * @returns x = x[0..|x|-1]
 */
export function pop$<T>(x: T[]): T[] {
  x.pop();
  return x;
}
export {pop as popBack$};


/**
 * Remove first value.
 * @param x an array
 * @returns x[1..]
 */
export function shift<T>(x: T[]): T[] {
  return x.slice(1);
}
export {shift as popFront};


/**
 * Remove first value!
 * @param x an array (updated!)
 * @returns x = x[1..]
 */
export function shift$<T>(x: T[]): T[] {
  x.shift();
  return x;
}
export {shift$ as popFront$};


/**
 * Add values to the start.
 * @param x an array
 * @param vs values to add
 * @returns vs ⧺ x
 */
export function unshift<T>(x: Iterable<T>, ...vs: T[]): T[] {
  return concat$(vs, x);
}
export {unshift as pushFront};
export {unshift as prepend};


/**
 * Add values to the start!
 * @param x an array (updated!)
 * @param vs values to add
 * @returns x = vs ⧺ x
 */
export function unshift$<T>(x: T[], ...vs: T[]): T[] {
  x.unshift(...vs);
  return x;
}
export {unshift$ as pushFront$};
export {unshift$ as prepend$};


/**
 * Copy part of array to another.
 * @param x target array
 * @param y source array
 * @param j write index [0]
 * @param i read begin index [0]
 * @param I read end index [|x|]
 * @returns x[0..j] ⧺ y[i..I] ⧺ x[j+I-i..]
 */
export function copy<T>(x: T[], y: T[], j: number=0, i: number=0, I: number=y.length): T[] {
  return copy$(x.slice(), y, j, i, I);
}


/**
 * Copy part of array to another!
 * @param x target array (updated!)
 * @param y source array
 * @param j write index [0]
 * @param i read begin index [0]
 * @param I read end index [|x|]
 * @returns x = x[0..j] ⧺ y[i..I] ⧺ x[j+I-i..]
 */
export function copy$<T>(x: T[], y: T[], j: number=0, i: number=0, I: number=y.length): T[] {
  j = index(x, j);
  [i, I] = indexRange(y, i, I);
  for (; i<I; ++i, ++j)
    x[j] = y[i];
  return x;
}


/**
 * Copy part of array within.
 * @param x an array
 * @param j write index [0]
 * @param i read begin index [0]
 * @param I read end index [|x|]
 * @returns x[0..j] ⧺ x[i..I] ⧺ x[j+I-i..]
 */
export function copyWithin<T>(x: T[], j: number=0, i: number=0, I: number=x.length): T[] {
  return x.slice().copyWithin(j, i, I);
}


/**
 * Copy part of array within!
 * @param x an array (updated!)
 * @param j write index [0]
 * @param i read begin index [0]
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
 * @param i read begin index [0]
 * @param I read end index [|x|]
 * @returns x[0..j] ⧺ x[i..I] ⧺ x[j..i] ⧺ x[I..]
 */
export function moveWithin<T>(x: T[], j: number=0, i: number=0, I: number=x.length): T[] {
  j = index(x, j);
  [i, I] = indexRange(x, i, I);
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
 * Move part of array within!
 * @param x an array (updated!)
 * @param j write ±index [0]
 * @param i read begin ±index [0]
 * @param I read end ±index [|x|]
 * @returns x = x[0..j] ⧺ x[i..I] ⧺ x[j..i] ⧺ x[I..]
 */
export function moveWithin$<T>(x: T[], j: number=0, i: number=0, I: number=x.length): T[] {
  j = index(x, j);
  [i, I] = indexRange(x, i, I);
  const p =  x.slice(i, I), P = p.length;
  if (j<i) x.copyWithin(j+P, j, i);
  else     x.copyWithin(i,   I, j);
  return copy$(x, p, j<i? j : j-P);
}
// DOUBT: Are negative indices any helpful (other than basic shortcuts)?
// DOUBT: It is not easy to use a negative index supporting function from another negative index supporting function.
// DOUBT: Seems to me they are only complicating implementation of algorithms, and should be removed.


/**
 * Remove or replace existing values.
 * @param x an array
 * @param i remove ±index
 * @param n number of values to remove [rest]
 * @param vs values to insert
 * @returns x[0..i] ⧺ vs ⧺ x[i+n..]
 */
export function splice<T>(x: T[], i: number, n: number=x.length, ...vs: T[]): T[] {
  i = index(x, i);
  n = Math.max(n, 0);
  return concat$(x.slice(0, i), vs, x.slice(i+n));
}
export {splice as toSpliced};


/**
 * Remove or replace existing values!
 * @param x an array (updated!)
 * @param i remove ±index
 * @param n number of values to remove [rest]
 * @param vs values to insert
 * @returns x = x[0..i] ⧺ vs ⧺ x[i+n..]
 */
export function splice$<T>(x: T[], i: number, n: number=x.length, ...vs: T[]): T[] {
  x.splice(i, n, ...vs);
  return x;
}
// #endregion




// #region COUNT/PARTITION
// -----------------------

/**
 * Count values which satisfy a test.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns Σtᵢ | tᵢ = 1 if ft(vᵢ) else 0; vᵢ ∈ x
 */
export function count<T>(x: T[], ft: TestFunction<T>): number {
  let i = -1, a = 0;
  for (const v of x)
    if (ft(v, ++i, x)) ++a;
  return a;
}


/**
 * Count occurrences of each distinct value.
 * @param x an array
 * @param fm map function (v, i, x)
 * @returns Map \{value ⇒ count\}
 */
export function countEach<T, U=T>(x: T[], fm: MapFunction<T, T|U> | null=null): Map<T|U, number> {
  fm = fm || IDENTITY;
  let i  = -1; const a = new Map();
  for (const v of x) {
    const w = fm(v, ++i, x);
    a.set(w, (a.get(w) || 0) + 1);
  }
  return a;
}
export {countEach as countAs};  // DEPRECATED


/**
 * Segregate values by test result.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns [satisfies, doesnt]
 */
export function partition<T>(x: T[], ft: TestFunction<T>): [T[], T[]] {
  const t: T[] = [], f: T[] = [];
  let i = -1;
  for (const v of x) {
    if (ft(v, ++i, x)) t.push(v);
    else f.push(v);
  }
  return [t, f];
}


/**
 * Segregate each distinct value.
 * @param x an array
 * @param fm map function (v, i, x)
 * @returns Map \{key ⇒ values\}
 */
export function partitionEach<T, U=T>(x: T[], fm: MapFunction<T, T|U> | null=null): Map<T|U, T[]> {
  fm = fm || IDENTITY;
  let i  = -1; const a = new Map<T|U, T[]>();
  for (const v of x) {
    const w = fm(v, ++i, x);
    if (!a.has(w)) a.set(w, []);
    a.get(w)!.push(v);
  }
  return a;
}
export {partitionEach as groupToMap};
export {partitionEach as partitionAs};    // DEPRECATED
// #endregion




// #region SPLITS
// --------------

/**
 * Break array considering test as separator.
 * @param x an array
 * @param ft test function (v, i, x)
 * @returns [x[j..k], x[l..m], ...] | ft(x[i]) = true; i = 0..j / k..l / ...
 */
export function split<T>(x: T[], ft: TestFunction<T>): T[][] {
  let i = -1;
  const a: T[][] = [];
  let b: T[] = [];
  for (const v of x) {
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
 * @returns [x[j..k], x[l..m], ...] | ft(x[i]) = true; i = 0..j / k..l / ...; i ∈ is
 */
export function splitAt<T>(x: T[], is: number[]): T[][] {
  let i = -1;
  const a: T[][] = [];
  let b: T[] = [];
  for (const v of x) {
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
 * @returns [x[0..j], x[j..k], ...] | ft(x[i]) = true; i = j, k, ...
 */
export function cut<T>(x: T[], ft: TestFunction<T>): T[][] {
  let j = 0; const a = [];
  const I = x.length;
  for (let i=0; i<I; ++i) {
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
 * @returns [x[0..j+1], x[j+1..k], ...] | ft(x[i]) = true; i = j, k, ...
 */
export function cutRight<T>(x: T[], ft: TestFunction<T>): T[][] {
  let j = 0; const a = [];
  const I = x.length;
  for (let i=0; i<I; ++i) {
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
 * @param is split ±indices (left to right)
 * @returns [x[0..j], x[j..k], ...] | ft(x[i]) = true; i = j, k, ...; i ∈ is
 */
export function cutAt<T>(x: T[], is: number[]): T[][] {
  const X = x.length;
  let j = 0; const a = [];
  for (let i of is) {
    i = i<0? X+i : i;
    a.push(x.slice(j, i));
    j = Math.max(j, i);
  }
  a.push(x.slice(j));
  return a;
}


/**
 * Break array after given indices.
 * @param x an array
 * @param is split ±indices (left to right)
 * @returns [x[0..j+1], x[j+1..k], ...] | ft(x[i]) = true; i = j, k, ...; i ∈ is
 */
export function cutAtRight<T>(x: T[], is: number[]): T[][] {
  const X = x.length;
  let j = 0; const a = [];
  for (let i of is) {
    i = i<0? X+i : i;
    a.push(x.slice(j, i+1));
    j = Math.max(j, i+1);
  }
  a.push(x.slice(j));
  return a;
}


/**
 * Keep similar values together and in order.
 * @param x an array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns [x[0..k], x[k..l], ...] | fc(x[i], x[j]) = 0; i, j = 0..k / k..l / ...
 */
export function group<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[][] {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const a: T[][] = [];
  let b: T[] = [];
  let u: T|U = undefined as T, i = -1;
  for (const v of x) {
    const w = fm(v, ++i, x);
    if (i===0 || fc(u, w)===0) b.push(v);
    else { a.push(b); b = [v]; }
    u = w;
  }
  a.push(b);
  return a;
}


/**
 * Break array into chunks of given size.
 * @param x an array
 * @param n chunk size [1]
 * @param s chunk step [n]
 * @returns x[0..n] ⧺ x[s..s+n] ⧺ x[2s..2s+n] ⧺ ...
 */
export function chunk<T>(x: T[], n: number=1, s: number=n): T[][] {
  const a: T[][] = [];
  if (n<0) return a;
  s = Math.max(s, 1);
  const I = x.length;
  for (let i=0; i<I; i+=s)
    a.push(x.slice(i, i+n));
  return a;
}
// #endregion




// #region CONCAT/JOIN
// -------------------

/**
 * Append values from arrays.
 * @param xs arrays
 * @returns x₀ ⧺ x₁ ⧺ ... | [x₀, x₁, ...] = xs
 */
export function concat<T>(...xs: T[][]): T[] {
  return ([] as T[]).concat(...xs);
}


/**
 * Append values from arrays!
 * @param x an array (updated!)
 * @param ys arrays to append
 * @returns x = x ⧺ y₀ ⧺ y₁ ⧺ ...] | [y₀, y₁, ...] = ys
 */
export function concat$<T>(x: T[], ...ys: Iterable<T>[]): T[] {
  for (const y of ys)
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
// #endregion




// #region REARRANGE
// -----------------

/**
 * Obtain values that cycle through array.
 * @param x an array
 * @param i begin ±index [0]
 * @param n number of values [|x|]
 */
export function cycle<T>(x: T[], i: number=0, n: number=x.length): T[] {
  const X = x.length;
  if (n<=0 || X===0) return [];
  i = mod(i, X);
  const a = x.slice(i, i+n);
  n -= a.length;
  const M = Math.floor(n/X);
  for (let m=0; m<M; ++m)
    concat$(a, x);
  return concat$(a, x.slice(0, n % X));
}


/**
 * Repeat an array given times.
 * @param x an array
 * @param n times [1]
 * @returns x ⧺ x ⧺ ...(n times)
 */
export function repeat<T>(x: T[], n: number=1): T[] {
  const a: T[] = [];
  for (; n>0; --n)
    concat$(a, x);
  return a;
}


/**
 * Reverse the values.
 * @param x an array
 * @returns [x[|x|-1], x[|x|-2], ..., x[1], x[0]]
 */
export function reverse<T>(x: T[]): T[] {
  return x.slice().reverse();
}
export {reverse as toReversed};


/**
 * Reverse the values!
 * @param x an array (updated!)
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
  n = mod(n, x.length);
  return concat$(x.slice(n), x.slice(0, n));
}


/**
 * Rotate values in array!
 * @param x an array (updated!)
 * @param n rotate amount (+ve: left, -ve: right) [0]
 * @returns x = x[n..] ⧺ x[0..n]
 */
export function rotate$<T>(x: T[], n: number=0): T[] {
  n = mod(n, x.length);
  const y = x.slice(0, n);
  x.copyWithin(0, n);
  return copy$(x, y, x.length-n);
}
// #endregion




// #region SET OPERATIONS
// ------------------------

/**
 * Examine if there are no duplicate values.
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
  fm = fm || IDENTITY;
  const s  = new Set(); let i = -1;
  for (const v of x) {
    const w = fm(v, ++i, x);
    if (s.has(w)) return false;
    s.add(w);
  }
  return true;
}

function isUniqueDual<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const x1 = [...x].map(fm);
  for (const wx of x1) {
    for (const wy of x1)
      if (fc(wx, wy)===0) return false;
  }
  return true;
}


/**
 * Examine if arrays have no value in common.
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
  fm = fm || IDENTITY;
  const s  = toSet(y, fm); let i = -1;
  for (const v of x) {
    const w = fm(v, ++i, x);
    if (s.has(w)) return false;
  }
  return true;
}

function isDisjointDual<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): boolean {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const y1 = [...y].map(fm); let i = -1;
  for (const vx of x) {
    const wx = fm(vx, ++i, x);
    for (const wy of y1)
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
  fm = fm || IDENTITY;
  const s  = new Set();
  let i  = -1; const a = [];
  for (const v of x) {
    const w = fm(v, ++i, x);
    if (s.has(w)) continue;
    s.add(w); a.push(v);
  }
  return a;
}

function uniqueDual<T, U=T>(x: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  let i  = -1; const s = [], a = [];
  x: for (const vx of x) {
    const wx = fm(vx, ++i, x);
    for (const ws of s)
      if (fc(ws, wx)===0) continue x;
    s.push(wx); a.push(vx);
  }
  return a;
}


/**
 * Obtain values present in any array.
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
 * Obtain values present in any array!
 * @param x an array (updated!)
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
  fm = fm || IDENTITY;
  const s  = toSet(x, fm); let i = -1;
  for (const vy of y) {
    const wy = fm(vy, ++i, y);
    if (!s.has(wy)) x.push(vy);
  }
  return x;
}

function unionDual$<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const x1 = x.map(fm); let i = -1;
  y: for (const vy of y) {
    const wy = fm(vy, ++i, y);
    for (const wx of x1)
      if (fc(wx, wy)===0) continue y;
    x.push(vy);
  }
  return x;
}


/**
 * Obtain values present in both arrays.
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
  fm = fm || IDENTITY;
  const s  = toSet(y, fm);
  let i  = -1; const a = [];
  for (const vx of x) {
    const wx = fm(vx, ++i, x);
    if (s.has(wx)) a.push(vx);
  }
  return a;
}

function intersectionDual<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const y1 = [...y].map(fm);
  let i  = -1; const a = [];
  x: for (const vx of x) {
    const wx = fm(vx, ++i, x);
    for (const wy of y1)
      if (fc(wx, wy)===0) { a.push(vx); continue x; }
  }
  return a;
}


/**
 * Obtain values not present in another array.
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
  fm = fm || IDENTITY;
  const s  = toSet(y, fm);
  let i  = -1; const a = [];
  for (const vx of x) {
    const wx = fm(vx, ++i, x);
    if (!s.has(wx)) a.push(vx);
  }
  return a;
}

function differenceDual<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  fc = fc || COMPARE;
  fm = fm || IDENTITY;
  const y1 = [...y].map(fm);
  let i  = -1; const a  = [];
  x: for (const vx of x) {
    const wx = fm(vx, ++i, x);
    for (const wy of y1)
      if (fc(wx, wy)===0) continue x;
    a.push(vx);
  }
  return a;
}


/**
 * Obtain values not present in both arrays.
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x-y ∪ y-x
 */
export function symmetricDifference<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): T[] {
  const x0 = fromIterable$(x);
  const y0 = fromIterable$(y);
  const ax = difference(x0, y0, fc, fm);
  const ay = difference(y0, x0, fc, fm);
  return concat$(ax, ay);
}


/**
 * Obtain cartesian product of arrays.
 * @param xs arrays
 * @param fm map function (vs, i)
 * @returns x₀ × x₁ × ... = \{[v₀, v₁, ...] | v₀ ∈ x₀, v₁ ∈ x₁, ...] \}
 */
export function cartesianProduct<T, U=T>(xs: T[][], fm: MapFunction<T[], T[]|U> | null=null): (T[]|U)[] {
  fm = fm || IDENTITY;
  const XS = xs.length;
  const a: (T[]|U)[] = [];
  if (XS===0) return a;
  const is = new Array(XS).fill(0);
  const ls = xs.map(x => x.length);
  if (ls.some(l => l===0)) return a;
  for (let i=0;; ++i) {
    const vs: T[] = [];
    for (let j=0; j<XS; ++j)
      vs.push(xs[j][is[j]]);
    a.push(fm(vs, i, null));
    let r = XS-1;
    for (; r>=0; --r) {
      if (++is[r]<ls[r]) break;
      is[r] = 0;
    }
    if (r<0) break;
  }
  return a;
}
// #endregion
// #endregion
