declare module 'extra-array' {
  type compareFn<T> = (...args: T[]) => number;
  type testFn<T> = (v: T, i: number, x: T[]) => boolean;
  type mapFn<T, U> = (v: T, i: number, x: T[]) => U;
  
  /**
   * Binary searches leftmost value in sorted array.
   * @param x an array (sorted)
   * @param v search value
   * @param fn compare function (a, b)
   * @returns first index of value | ~(index of closest value)
   */
  export function bsearch<T>(x: T[], v: T, fn?: compareFn<T>): number;

  /**
   * Binary searches value in sorted array.
   * @param x an array (sorted)
   * @param v search value
   * @param fn compare function (a, b)
   * @returns index of value | ~(index of closest value)
   */
  export function bsearchAny<T>(x: T[], v: T, fn?: compareFn<T>): number;

  /**
   * Binary searches closest value in sorted array.
   * @param x an array (sorted)
   * @param v search value
   * @param fn compare function (a, b)
   * @returns index of closest value
   */
  export function bsearchClosest<T>(x: T[], v: T, fn?: compareFn<T>): number;

  /**
   * Binary searches rightmost value in sorted array.
   * @param x an array (sorted)
   * @param v search value
   * @param  fn compare function (a, b)`
   * @returns last index of value | ~(index of closest value)
   */
  export function bsearchRight<T>(x: T[], v: T, fn?: compareFn<T>): number;

  /**
   * Breaks array into chunks of given size.
   * @param x an array
   * @param n chunk size
   * @returns chunks
   */
  export function chunk<T>(x: T[], n?: number): T[][];

  /**
   * Compares two arrays.
   * @param x an array
   * @param y another array
   * @param fn compare function (a, b)
   * @returns x<y: -1, x=y: 0, x>y: 1
   */
  export function compare<T>(x: T[], y: T[], fn?: compareFn<T>): number;

  /**
   * Appends arrays to the end.
   * @param x an array (updated)
   * @param ys arrays to append
   * @returns x
   */
  export function concat$<T>(x: T[], ...ys: Iterable<T>[]): T[];

  /**
   * Gets true index to array (+ve).
   * @param x an array
   * @param i index (+ve, -ve)
   * @returns +ve index
   */
  export function index<T>(x: T[], i: number): number;

  /**
   * Copies part of array to another.
   * @param x target array (updated)
   * @param y source array
   * @param j write index (0)
   * @param i read start index (0)
   * @param I read end index (x.length)
   * @returns x
   */
  export function copy$<T>(x: T[], y: T[], j?: number, i?: number, I?: number): T[];

  /**
   * Copies part of array to another.
   * @param x target array
   * @param y source array
   * @param j write index (0)
   * @param i read start index (0)
   * @param I read end index (x.length)
   * @returns 
   */
  export function copy<T>(x: T[], y: T[], j?: number, i?: number, I?: number): T[];

  /**
   * Copies part of array within.
   * @param x an array
   * @param j write index
   * @param i read start index (0)
   * @param I read end index (x.length)
   * @returns 
   */
  export function copyWithin<T>(x: T[], j: number, i?: number, I?: number): T[];

  /**
   * Counts occurrences of a value.
   * @param x an array
   * @param v value
   * @param fn compare function (a, b)
   * @returns occurrences
   */
  export function count<T>(x: T[], v: T, fn?: compareFn<T>): number;

  /**
   * Counts occurrences of values.
   * @param x an array
   * @param fn map function (v, i, x)
   * @param ths this argument
   * @returns occurrences
   */
  export function countAllOn<T, U>(x: T[], fn?: mapFn<T, U>, ths?: object): Map<U, number>;

  /**
   * Counts occurrences of a value.
   * @param x an array
   * @param v value
   * @param fn map function (v, i, x)
   * @param ths this argument
   * @returns occurrences
   */
  export function countOn<T, U>(x: T[], v: T, fn?: mapFn<T, U>, ths?: object): number;

  /**
   * Breaks array at given indices.
   * @param x an array
   * @param is split indices (sorted)
   * @returns [...pieces]
   */
  export function cut<T>(x: T[], is: number[]): T[][];

  /**
   * Breaks array after given indices.
   * @param x an array
   * @param is split indices (sorted)
   * @returns [...pieces]
   */
  export function cutRight<T>(x: T[], is: number[]): T[][];

  /**
   * Gives values of an array not present in another.
   * @param x an array
   * @param y another array
   * @param fn compare function (a, b)
   * @returns 
   */
  export function difference<T>(x: T[], y: T[], fn?: compareFn<T>): T[];

  /**
   * Gives values of an array not present in another.
   * @param x an array
   * @param y another array
   * @param fn map function (v, i, x)
   * @param ths this argument
   * @returns 
   */
  export function differenceOn<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): T[];

  /**
   * Fills with given value.
   * @param x an array
   * @param v value
   * @param i start index (0)
   * @param I end index (x.length-1)
   * @returns filled
   */
  export function fill<T>(x: T[], v: T, i?: number, I?: number): T[];

  /**
   * Keeps the values which pass the test.
   * @param x an array (updated)
   * @param fn test function (v, i, x)
   * @param ths this argument
   * @returns x
   */
  export function filter$<T>(x: T[], fn: testFn<T>, ths?: object): T[];

  /**
   * Finds indices of values passing the test.
   * @param x an array
   * @param fn test function (v, i, x)
   * @param ths this argument
   * @returns [...indices]
   */
  export function findIndices<T>(x: T[], fn: testFn<T>, ths?: object): number[];
  /**
   * Finds index of rightmost value passing the test.
   * @param x an array
   * @param fn test function (v, i, x)
   * @param ths this argument
   * @returns index of value, -1 if not found
   */
  export function findRight<T>(x: T[], fn: testFn<T>, ths?: object): number;

  /**
   * Flattens nested array to given depth.
   * @param x a nested array
   * @param dep maximum depth (-1)
   * @returns flattened
   */
  export function flatten<T, U>(x: T[], dep?: number): U[];

  /**
   * Gets value at index (+ve, -ve).
   * @param x an array
   * @param i index (-ve: from right)
   * @returns value
   */
  export function get<T>(x: T[], i: number): T;

  /**
   * Gets value at indices (+ve, -ve).
   * @param x an array
   * @param is indices (-ve: from right)
   * @returns [...values]
   */
  export function getAll<T>(x: T[], is: number[]): T[];

  /**
   * Gets value at fractional index.
   * @param x an array
   * @param f fractional index 0->1
   * @returns value
   */
  export function getLerp<T>(x: T[], f?: number): T;

  /**
   * Keeps similar values together and in order.
   * @param x an array
   * @param fn compare function (a, b)
   * @returns 
   */
  export function group<T>(x: T[], fn?: compareFn<T>): T[][];

  /**
   * Keeps similar values together and in order.
   * @param x an array
   * @param fn map function (v, i, x)
   * @param ths this argument
   * @returns 
   */
  export function groupOn<T, U>(x: T[], fn?: mapFn<T, U>, ths?: object): T[][];

  /**
   * Gets first value.
   * @param x an array
   * @returns first value
   */
  export function head<T>(x: T[]): T;

  /**
   * Lists all possible infixes.
   * @param x an array
   * @returns ...infixes
   */
  export function infixes<T>(x: T[]): Iterable<T[]>;

  /**
   * Gets values except last.
   * @param x an array
   * @returns except last
   */
  export function init<T>(x: T[]): T[];

  /**
   * Gives values of an array present in another.
   * @param x an array
   * @param y another array
   * @param fn compare function (a, b)
   * @returns 
   */
  export function intersection<T>(x: T[], y: T[], fn?: compareFn<T>): T[];

  /**
   * Gives values of an array present in another.
   * @param x an array
   * @param y another array
   * @param fn map function (v, i, x)
   * @param ths this argument
   * @returns 
   */
  export function intersectionOn<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): T[];

  /**
   * Checks if arrays have no value in common.
   * @param x an array
   * @param y another array
   * @param fn compare function (a, b)
   * @returns true if disjoint
   */
  export function isDisjoint<T>(x: T[], y: T[], fn?: compareFn<T>): boolean;

  /**
   * Checks if arrays have no value in common.
   * @param x an array
   * @param y another array
   * @param fn map function (v, i, x)
   * @param ths this argument
   * @returns true if disjoint
   */
  export function isDisjointOn<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): boolean;

  /**
   * Checks if two arrays are equal.
   * @param x an array
   * @param y another array
   * @param fn compare function (a, b)
   * @returns true if equal
   */
  export function isEqual<T>(x: T[], y: T[], fn?: compareFn<T>): boolean;

  /**
   * Checks if array contains an infix.
   * @param x an array
   * @param y infix?
   * @param fn compare function (a, b)
   * @returns true if infix
   */
  export function isInfix<T>(x: T[], y: T[], fn?: compareFn<T>): boolean;

  /**
   * Checks if array contains an infix.
   * @param x an array
   * @param y infix?
   * @param fn map function (v, i, x)
   * @param ths this argument
   * @returns true if infix
   */
  export function isInfixOn<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): boolean;

  /**
   * Checks if array has a permutation.
   * @param x an array
   * @param y permutation?
   * @param fn compare function (a, b)
   * @returns true if permutation
   */
  export function isPermutation<T>(x: T[], y: T[], fn?: compareFn<T>): boolean;

  /**
   * Checks if array has a permutation.
   * @param x an array
   * @param y permutation?
   * @param fn map function (v, i, x)
   * @param ths this argument
   * @returns true if permutation
   */
  export function isPermutationOn<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): boolean;

  /**
   * Checks if array starts with a prefix.
   * @param x an array
   * @param y prefix?
   * @param fn compare function (a, b)
   * @returns true if prefix
   */
  export function isPrefix<T>(x: T[], y: T[], fn?: compareFn<T>): boolean;

  /**
   * Checks if array starts with a prefix.
   * @param x an array
   * @param y prefix?
   * @param fn map function (v, i, x)
   * @param ths this argument
   * @returns true if prefix
   */
  export function isPrefixOn<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): boolean;

  /**
   * Checks if array has a subsequence.
   * @param x an array
   * @param y subsequence?
   * @param fn compare function (a, b)
   * @returns true if subsequence
   */
  export function isSubsequence<T>(x: T[], y: T[], fn?: compareFn<T>): boolean;

  /**
   * Checks if array has a subsequence.
   * @param x an array
   * @param y subsequence?
   * @param fn map function (v, i, x)
   * @param ths this argument
   * @returns true if subsequence
   */
  export function isSubsequenceOn<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): boolean;

  /**
   * Checks if array ends with a suffix.
   * @param x an array
   * @param y suffix?
   * @param fn compare function (a, b)
   * @returns true if suffix
   */
  export function isSuffix<T>(x: T[], y: T[], fn?: compareFn<T>): boolean;

  /**
   * Checks if array ends with a suffix.
   * @param x an array
   * @param y suffix?
   * @param fn map function (v, i, x)
   * @param ths this argument
   * @returns true if suffix
   */
  export function isSuffixOn<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): boolean;

  /**
   * Gets last value.
   * @param x an array
   * @returns last value
   */
  export function last<T>(x: T[]): T;

  /**
   * Returns evenly spaced values within given interval.
   * @param v start of interval
   * @param V end of interval (excluding)
   * @param stp spacing between values (1)
   * @returns 
   */
  export function range<T>(v: number, V: number, stp?: number): T[];

  /**
   * Returns evenly spaced values within given interval.
   * @param v start of interval
   * @param V end of interval
   * @param n no. of values in between (100)
   * @returns 
   */
  export function linspace<T>(v: number, V: number, n?: number): T[];

  /**
   * Updates values based on map function.
   * @param x an array (updated)
   * @param fn map function (v, i, x)
   * @param ths this argument
   * @returns x
   */
  export function map$<T, U>(x: T[], fn?: mapFn<T, U>, ths?: object): T[];

  /**
   * Breaks array into values, by test.
   * @param x an array
   * @param fn test function (v, i, x)
   * @param ths this argument
   * @returns [[...satisfies], [...doesnt]]
   */
  export function partition<T>(x: T[], fn: testFn<T>, ths?: object): T[][];

  /**
   * Breaks array into values, by map.
   * @param x an array
   * @param fn map function (v, i, x)
   * @param ths this argument
   * @returns key => [...values]
   */
  export function partitionOn<T, U>(x: T[], fn?: mapFn<T, U>, ths?: object): Map<U, T[]>;

  /**
   * Removes or replaces existing values.
   * @param x an array
   * @param i remove index
   * @param n no. of values to remove
   * @param vs values to insert
   * @returns [0->i, vs, i+n->I]
   */
  export function splice<T>(x: T[], i: number, n?: number, ...vs: T[]): T[];

  /**
   * Lists all possible arrangements.
   * @param x an array
   * @returns ...permutations
   */
  export function permutations<T>(x: T[]): Iterable<T[]>;

  /**
   * Removes last value.
   * @param x an array
   * @returns [value, array]
   */
  export function pop<T>(x: T[]): [T, T[]];

  /**
   * Lists all possible prefixes.
   * @param x an array
   * @returns ...prefixes
   */
  export function prefixes<T>(x: T[]): Iterable<T[]>

  /**
   * Adds values to the end. 
   * @param x an array
   * @param vs values to add
   * @returns pushed
   */
  export function push<T>(x: T[], ...vs: T[]): T[];

  /**
   * Repeats an array given times.
   * @param x an array
   * @param n times
   * @returns 
   */
  export function repeat<T>(x: T[], n: number): T[];

  /**
   * Reverses the values.
   * @param x an array
   * @returns reversed
   */
  export function reverse<T>(x: T[]): T[];

  /**
   * Rotates values in array.
   * @param x an array (updated)
   * @param n rotate amount (-ve: left, +ve: right)
   * @returns x
   */
  export function rotate$<T>(x: T[], n: number): T[];

  /**
   * Rotates values in array.
   * @param x an array
   * @param n rotate amount (-ve: left, +ve: right)
   * @returns 
   */
  export function rotate<T>(x: T[], n: number): T[];

  /**
   * Searches a value from left.
   * @param x an array
   * @param v search value
   * @param fn compare function (a, b)
   * @returns index of value, -1 if not found
   */
  export function search<T>(x: T[], v: T, fn?: compareFn<T>): number;

  /**
   * Searches a value throughout.
   * @param x an array
   * @param v search value
   * @param fn compare function (a, b)
   * @returns indices of value
   */
  export function searchAll<T>(x: T[], v: T, fn?: compareFn<T>): number[];

  /**
   * Searches a value from right.
   * @param x an array
   * @param v search value
   * @param fn compare function (a, b)
   * @returns index of value, -1 if not found
   */
  export function searchRight<T>(x: T[], v: T, fn?: compareFn<T>): number;

  /**
   * Sets value at index (+ve, -ve).
   * @param x an array (updated)
   * @param i index (-ve: from right)
   * @param v value
   * @returns x
   */
  export function set$<T>(x: T[], i: number, v: T): T[];

  /**
   * Sets value at index (+ve, -ve).
   * @param x an array
   * @param i index (-ve: from right)
   * @param v value
   * @returns set array
   */
  export function set<T>(x: T[], i: number, v: T): T[];

  /**
   * Removes first value.
   * @param x an array
   * @returns [value, array]
   */
  export function shift<T>(x: T[]): [T, T[]];

  /**
   * Rearranges values in arbitrary order.
   * @param x an array (updated)
   * @param n random seed 0->1
   * @returns x
   */
  export function shuffle$<T>(x: T[], n?: number): T[];

  /**
   * Rearranges values in arbitrary order.
   * @param x an array
   * @param n random seed
   * @returns 
   */
  export function shuffle<T>(x: T[], n?: number): T[];

  /**
   * Keeps only the selected region.
   * @param x an array (updated)
   * @param i start index (0)
   * @param I end index (x.length)
   * @returns x
   */
  export function slice$<T>(x: T[], i?: number, I?: number): T[];

  /**
   * Arranges values in an order.
   * @param x an array
   * @param fn compare function (a, b)
   * @returns sorted array
   */
  export function sort<T>(x: T[], fn?: compareFn<T>): T[];

  /**
   * Arranges values in an order.
   * @param x an array (updated)
   * @param fn map function (v, i, x)
   * @param ths this argument
   * @returns x
   */
  export function sortOn$<T, U>(x: T[], fn?: mapFn<T, U>, ths?: object): T[];

  /**
   * Arranges values in an order.
   * @param x an array
   * @param fn map function (v, i, x)
   * @param ths this argument
   * @returns 
   */
  export function sortOn<T, U>(x: T[], fn?: mapFn<T, U>, ths?: object): T[];

  /**
   * Breaks array considering test as separator.
   * @param x an array
   * @param fn test function (v, i, x)
   * @param ths this argument
   * @returns [...pieces]
   */
  export function split<T>(x: T[], fn: testFn<T>, ths?: object): T[][];

  /**
   * Lists all possible partial sequences.
   * @param x an array
   * @returns ...subsequences
   */
  export function subsequences<T>(x: T[]): Iterable<T[]>;

  /**
   * Lists all possible suffixes.
   * @param x an array
   * @returns ...suffixes
   */
  export function suffixes<T>(x: T[]): Iterable<T[]>;

  /**
   * Exchanges two values.
   * @param x an array (updated)
   * @param i an index
   * @param j another index
   * @returns x
   */
  export function swap$<T>(x: T[], i: number, j: number): T[];

  /**
   * Exchanges two values.
   * @param x an array
   * @param i an index
   * @param j another index
   * @returns 
   */
  export function swap<T>(x: T[], i: number, j: number): T[];

  /**
   * Gets values except first.
   * @param x an array
   * @returns except first
   */
  export function tail<T>(x: T[]): T[];

  /**
   * Gives union of first array with another.
   * @param x an array (updated)
   * @param y another array
   * @param fn compare function (a, b)
   * @returns x
   */
  export function union$<T>(x: T[], y: T[], fn?: compareFn<T>): T[];

  /**
   * Gives union of first array with another.
   * @param x an array
   * @param y another array
   * @param fn compare function (a, b)
   * @returns 
   */
  export function union<T>(x: T[], y: T[], fn?: compareFn<T>): T[];

  /**
   * Gives union of first array with another.
   * @param x an array (updated)
   * @param y another array
   * @param fn map function (v, i, x)
   * @param ths this argument
   * @returns x
   */
  export function unionOn$<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): T[];

  /**
   * Gives union of first array with another.
   * @param x an array
   * @param y another array
   * @param fn map function (v, i, x)
   * @param ths this argument
   * @returns 
   */
  export function unionOn<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): T[];

  /**
   * Removes duplicate elements.
   * @param x an array
   * @param fn compare function (a, b)
   * @returns unique values
   */
  export function unique<T>(x: T[], fn?: compareFn<T>): T[];

  /**
   * Removes duplicate elements.
   * @param x an array
   * @param fn map function (v, i, x)
   * @param ths this argument
   * @returns unique values
   */
  export function uniqueOn<T, U>(x: T[], fn?: mapFn<T, U>, ths?: object): T[];

  /**
   * Adds values to the start.
   * @param x an array
   * @param vs values to add
   * @returns unshifted
   */
  export function unshift<T>(x: T[], ...vs: T[]): T[];

  /**
   * Combines values from n arrays, with a function.
   * @param xs n arrays
   * @param fn combine function (a, b, c, ...)
   * @param ths this argument
   * @returns combined values
   */
  export function zip<T, U>(xs: T[][], fn?: (...args: T[]) => U, ths?: object): U[];
}
