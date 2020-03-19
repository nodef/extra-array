declare module 'extra-array' {
  type compareFn<T> = (...args: T[]) => number;
  type mapFn<T, U> = (v: T, i: number, x: T[]) => U;

  /**
   * Binary searches leftmost value in sorted array.
   * @param {Array} x an array (sorted)
   * @param {*} v search value
   * @param {function?} fn compare function (a, b)
   * @returns {number} first index of value | ~(index of closest value)
   */
  export function bsearch<T>(x: T[], v: T, fn?: compareFn<T>): number;

  /**
   * Binary searches value in sorted array.
   * @param {Array} x an array (sorted)
   * @param {*} v search value
   * @param {function?} fn compare function (a, b)
   * @returns {number} index of value | ~(index of closest value)
   */
  export function bsearchAny<T>(x: T[], v: T, fn?: compareFn<T>): number;

  /**
   * Binary searches closest value in sorted array.
   * @param {Array} x an array (sorted)
   * @param {*} v search value
   * @param {function?} fn compare function (a, b)
   * @returns {number} index of closest value
   */
  export function bsearchClosest<T>(x: T[], v: T, fn?: compareFn<T>): number;

  /**
   * Binary searches rightmost value in sorted array.
   * @param {Array} x an array (sorted)
   * @param {*} v search value
   * @param {function?} fn compare function (a, b)
   * @returns {number} last index of value | ~(index of closest value)
   */
  export function bsearchRight<T>(x: T[], v: T, fn?: compareFn<T>): number;

  /**
   * Breaks array into chunks of given size.
   * @param {Array} x an array
   * @param {number?} n chunk size
   * @returns {Array<Array>} chunks
   */
  export function chunk<T>(x: T[], n?: number): T[][];

  /**
   * Compares two arrays.
   * @param {Array} x an array
   * @param {Array} y another array
   * @param {function?} fn compare function (a, b)
   * @returns {number} x<y: -1, x=y: 0, x>y: 1
   */
  export function compare<T>(x: T[], y: T[], fn?: compareFn<T>): number;

  /**
   * Appends arrays to the end.
   * @param {Array} x an array (updated)
   * @param {...Iterable} ys arrays to append
   * @returns {Array} x
   */
  export function concat$<T>(x: T[], ...ys: Iterable<T>[]): T[];

  /**
   * Gets true index to array (+ve).
   * @param {Array} x an array
   * @param {number} i index (+ve, -ve)
   * @returns {number} +ve index
   */
  export function index<T>(x: T[], i: number): number;

  /**
   * Copies part of array to another.
   * @param {Array} x target array (updated)
   * @param {Array} y source array
   * @param {number?} j write index (0)
   * @param {number?} i read start index (0)
   * @param {number?} I read end index (x.length)
   * @returns {Array} x
   */
  export function copy$<T>(x: T[], y: T[], j?: number, i?: number, I?: number): T[];

  /**
   * Copies part of array to another.
   * @param {Array} x target array
   * @param {Array} y source array
   * @param {number?} j write index (0)
   * @param {number?} i read start index (0)
   * @param {number?} I read end index (x.length)
   * @returns {Array}
   */
  export function copy<T>(x: T[], y: T[], j?: number, i?: number, I?: number): T[];

  /**
   * Copies part of array within.
   * @param {Array} x an array
   * @param {number} j write index
   * @param {number?} i read start index (0)
   * @param {number?} I read end index (x.length)
   * @returns {Array}
   */
  export function copyWithin<T>(x: T[], j: number, i?: number, I?: number): T[];

  /**
   * Counts occurrences of a value.
   * @param {Array} x an array
   * @param {*} v value
   * @param {function?} fn compare function (a, b)
   * @returns {number} occurrences
   */
  export function count<T>(x: T[], v: T, fn?: compareFn<T>): number;

  /**
   * Counts occurrences of values.
   * @param {Array} x an array
   * @param {function?} fn map function (v, i, x)
   * @param {object?} ths this argument
   * @returns {Map<any, number>} occurrences
   */
  export function countAllOn<T, U>(x: T[], fn?: mapFn<T, U>, ths?: object): Map<U, number>;

  /**
   * Counts occurrences of a value.
   * @param {Array} x an array
   * @param {*} v value
   * @param {function?} fn map function (v, i, x)
   * @param {object?} ths this argument
   * @returns {number} occurrences
   */
  export function countOn<T, U>(x: T[], v: T, fn?: mapFn<T, U>, ths?: object): number;

  /**
   * Breaks array at given indices.
   * @param {Array} x an array
   * @param {Array<number>} is split indices (sorted)
   * @returns {Array<Array>} [...pieces]
   */
  export function cut<T>(x: T[], is: number[]): T[][];

  /**
   * Breaks array after given indices.
   * @param {Array} x an array
   * @param {Array<number>} is split indices (sorted)
   * @returns {Array<Array>} [...pieces]
   */
  export function cutRight<T>(x: T[], is: number[]): T[][];

  /**
   * Gives values of an array not present in another.
   * @param {Array} x an array
   * @param {Array} y another array
   * @param {function?} fn compare function (a, b)
   * @returns {Array}
   */
  export function difference<T>(x: T[], y: T[], fn?: compareFn<T>): T[];

  /**
   * Gives values of an array not present in another.
   * @param {Array} x an array
   * @param {Array} y another array
   * @param {function?} fn map function (v, i, x)
   * @param {object?} ths this argument
   * @returns {Array}
   */
  export function differenceOn<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): T[];

  /**
   * Fills with given value.
   * @param {Array} x an array
   * @param {*} v value
   * @param {number?} i start index (0)
   * @param {number?} I end index (x.length-1)
   * @returns {Array} filled
   */
  export function fill<T>(x: T[], v: T, i?: number, I?: number): T[];

  /**
   * Keeps the values which pass the test.
   * @param {Array} x an array (updated)
   * @param {function} fn filter function (v, i, x)
   * @param {object?} ths this argument
   * @returns {Array} x
   */
  export function filter$<T>(x: T[], fn: (v: T, i: number, x?: T[]) => T[], ths?: object): T[];

  /**
   * Finds indices of values passing the test.
   * @param {Array} x an array
   * @param {function} fn test function (v, i, x)
   * @param {object?} ths this argument
   * @returns {Array<number>} [...indices]
   */
  export function findIndices<T>(x: T[], fn: (v: T, i?: number, x?: T[]) => boolean, ths?: object): number[];
  /**
   * Finds index of rightmost value passing the test.
   * @param {Array} x an array
   * @param {function} fn test function (v, i, x)
   * @param {object?} ths this argument
   * @returns {number} index of value, -1 if not found
   */
  export function findRight<T>(x: T[], fn: (v: T, i?: number, x?: T[]) => boolean, ths?: object): number;

  /**
   * Flattens nested array to given depth.
   * @param {Array} x a nested array
   * @param {number?} dep maximum depth (-1)
   * @returns {Array} flattened
   */
  export function flatten<T, U>(x: T[], dep?: number): U[];

  /**
   * Gets value at index (+ve, -ve).
   * @param {Array} x an array
   * @param {number} i index (-ve: from right)
   * @returns {*} value
   */
  export function get<T>(x: T[], i: number): T;

  /**
   * Gets value at indices (+ve, -ve).
   * @param {Array} x an array
   * @param {Array<number>} is indices (-ve: from right)
   * @returns {*} [...values]
   */
  export function getAll<T>(x: T[], is: number[]): T[];

  /**
   * Gets value at fractional index.
   * @param {Array} x an array
   * @param {number?} f fractional index 0->1
   * @returns {*} value
   */
  export function getLerp<T>(x: T[], f?: number): T;

  /**
   * Keeps similar values together and in order.
   * @param {Array} x an array
   * @param {function?} fn compare function (a, b)
   * @returns {Array<Array>}
   */
  export function group<T>(x: T[], fn?: compareFn<T>): T[][];

  /**
   * Keeps similar values together and in order.
   * @param {Array} x an array
   * @param {function?} fn map function (v, i, x)
   * @param {object?} ths this argument
   * @returns {Array<Array>}
   */
  export function groupOn<T, U>(x: T[], fn?: mapFn<T, U>, ths?: object): T[][];

  /**
   * Gets first value.
   * @param {Array} x an array
   * @returns {*} first value
   */
  export function head<T>(x: T[]): T;

  /**
   * Lists all possible infixes.
   * @param {Array} x an array
   * @returns {Iterable<Array>} ...infixes
   */
  export function infixes<T>(x: T[]): Iterable<T[]>;

  /**
   * Gets values except last.
   * @param {Array} x an array
   * @returns {Array} except last
   */
  export function init<T>(x: T[]): T[];

  /**
   * Gives values of an array present in another.
   * @param {Array} x an array
   * @param {Array} y another array
   * @param {function?} fn compare function (a, b)
   * @returns {Array}
   */
  export function intersection<T>(x: T[], y: T[], fn?: compareFn<T>): T[];

  /**
   * Gives values of an array present in another.
   * @param {Array} x an array
   * @param {Array} y another array
   * @param {function?} fn map function (v, i, x)
   * @param {object?} ths this argument
   * @returns {Array}
   */
  export function intersectionOn<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): T[];

  /**
   * Checks if arrays have no value in common.
   * @param {Array} x an array
   * @param {Array} y another array
   * @param {function?} fn compare function (a, b)
   * @returns {boolean} true if disjoint
   */
  export function isDisjoint<T>(x: T[], y: T[], fn?: compareFn<T>): boolean;

  /**
   * Checks if arrays have no value in common.
   * @param {Array} x an array
   * @param {Array} y another array
   * @param {function?} fn map function (v, i, x)
   * @param {object?} ths this argument
   * @returns {boolean} true if disjoint
   */
  export function isDisjointOn<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): boolean;

  /**
   * Checks if two arrays are equal.
   * @param {Array} x an array
   * @param {Array} y another array
   * @param {function?} fn compare function (a, b)
   * @returns {boolean} true if equal
   */
  export function isEqual<T>(x: T[], y: T[], fn?: compareFn<T>): boolean;

  /**
   * Checks if array contains an infix.
   * @param {Array} x an array
   * @param {Array} y infix?
   * @param {function?} fn compare function (a, b)
   * @returns {boolean} true if infix
   */
  export function isInfix<T>(x: T[], y: T[], fn?: compareFn<T>): boolean;

  /**
   * Checks if array contains an infix.
   * @param {Array} x an array
   * @param {Array} y infix?
   * @param {function?} fn map function (v, i, x)
   * @param {object?} ths this argument
   * @returns {boolean} true if infix
   */
  export function isInfixOn<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): boolean;

  /**
   * Checks if array has a permutation.
   * @param {Array} x an array
   * @param {Array} y permutation?
   * @param {function?} fn compare function (a, b)
   * @returns {boolean} true if permutation
   */
  export function isPermutation<T>(x: T[], y: T[], fn?: compareFn<T>): boolean;

  /**
   * Checks if array has a permutation.
   * @param {Array} x an array
   * @param {Array} y permutation?
   * @param {function?} fn map function (v, i, x)
   * @param {object?} ths this argument
   * @returns {boolean} true if permutation
   */
  export function isPermutationOn<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): boolean;

  /**
   * Checks if array starts with a prefix.
   * @param {Array} x an array
   * @param {Array} y prefix?
   * @param {function?} fn compare function (a, b)
   * @returns {boolean} true if prefix
   */
  export function isPrefix<T>(x: T[], y: T[], fn?: compareFn<T>): boolean;

  /**
   * Checks if array starts with a prefix.
   * @param {Array} x an array
   * @param {Array} y prefix?
   * @param {function?} fn map function (v, i, x)
   * @param {object?} ths this argument
   * @returns {boolean} true if prefix
   */
  export function isPrefixOn<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): boolean;

  /**
   * Checks if array has a subsequence.
   * @param {Array} x an array
   * @param {Array} y subsequence?
   * @param {function?} fn compare function (a, b)
   * @returns {boolean} true if subsequence
   */
  export function isSubsequence<T>(x: T[], y: T[], fn?: compareFn<T>): boolean;

  /**
   * Checks if array has a subsequence.
   * @param {Array} x an array
   * @param {Array} y subsequence?
   * @param {function?} fn map function (v, i, x)
   * @param {object?} ths this argument
   * @returns {boolean} true if subsequence
   */
  export function isSubsequenceOn<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): boolean;

  /**
   * Checks if array ends with a suffix.
   * @param {Array} x an array
   * @param {Array} y suffix?
   * @param {function?} fn compare function (a, b)
   * @returns {boolean} true if suffix
   */
  export function isSuffix<T>(x: T[], y: T[], fn?: compareFn<T>): boolean;

  /**
   * Checks if array ends with a suffix.
   * @param {Array} x an array
   * @param {Array} y suffix?
   * @param {function?} fn map function (v, i, x)
   * @param {object?} ths this argument
   * @returns {boolean} true if suffix
   */
  export function isSuffixOn<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): boolean;

  /**
   * Gets last value.
   * @param {Array} x an array
   * @returns {*} last value
   */
  export function last<T>(x: T[]): T;

  /**
   * Returns evenly spaced values within given interval.
   * @param {number} v start of interval
   * @param {number} V end of interval (excluding)
   * @param {number?} stp spacing between values (1)
   * @returns {Array}
   */
  export function range<T>(v: number, V: number, stp?: number): T[];

  /**
   * Returns evenly spaced values within given interval.
   * @param {number} v start of interval
   * @param {number} V end of interval
   * @param {number?} n no. of values in between (100)
   * @returns {Array}
   */
  export function linspace<T>(v: number, V: number, n?: number): T[];

  /**
   * Updates values based on map function.
   * @param {Array} x an array (updated)
   * @param {function} fn map function (v, i, x)
   * @param {object?} ths this argument
   * @returns {Array} x
   */
  export function map$<T, U>(x: T[], fn?: mapFn<T, U>, ths?: object): T[];

  /**
   * Breaks array into values, by test.
   * @param {Array} x an array
   * @param {function} fn test function (v, i, x)
   * @param {object?} ths this argument
   * @returns {Array<Array>} [[...satisfies], [...doesnt]]
   */
  export function partition<T>(x: T[], fn: (v: T, i?: number, x?: T[]) => boolean, ths?: object): T[][];

  /**
   * Breaks array into values, by map.
   * @param {Array} x an array
   * @param {function} fn map function (v, i, x)
   * @param {object?} ths this argument
   * @returns {Map<any, Array>} {key => [...values]}
   */
  export function partitionOn<T, U>(x: T[], fn?: mapFn<T, U>, ths?: object): Map<U, T[]>;

  /**
   * Removes or replaces existing values.
   * @param {Array} x an array
   * @param {number} i remove index
   * @param {number?} n no. of values to remove
   * @param {...any} vs values to insert
   * @returns {Array} [0->i, vs, i+n->I]
   */
  export function splice<T>(x: T[], i: number, n?: number, ...vs: T[]): T[];

  /**
   * Lists all possible arrangements.
   * @param {Array} x an array
   * @returns {Iterable<Array>} ...permutations
   */
  export function permutations<T>(x: T[]): Iterable<T[]>;

  /**
   * Removes last value.
   * @param {Array} x an array
   * @returns {Array} [value, array]
   */
  export function pop<T>(x: T[]): [T, T[]];

  /**
   * Lists all possible prefixes.
   * @param {Array} x an array
   * @returns {Iterable<Array>} ...prefixes
   */
  export function prefixes<T>(x: T[]): Iterable<T[]>

  /**
   * Adds values to the end. 
   * @param {Array} x an array
   * @param {...any} vs values to add
   * @returns {Array} pushed
   */
  export function push<T>(x: T[], ...vs: T[]): T[];

  /**
   * Repeats an array given times.
   * @param {Array} x an array
   * @param {number} n times
   * @returns {Array}
   */
  export function repeat<T>(x: T[], n: number): T[];

  /**
   * Reverses the values.
   * @param {Array} x an array
   * @returns {Array} reversed
   */
  export function reverse<T>(x: T[]): T[];

  /**
   * Rotates values in array.
   * @param {Array} x an array (updated)
   * @param {number} n rotate amount (-ve: left, +ve: right)
   * @returns {Array} x
   */
  export function rotate$<T>(x: T[], n: number): T[];

  /**
   * Rotates values in array.
   * @param {Array} x an array
   * @param {number} n rotate amount (-ve: left, +ve: right)
   * @returns {Array}
   */
  export function rotate<T>(x: T[], n: number): T[];

  /**
   * Searches a value from left.
   * @param {Array} x an array
   * @param {*} v search value
   * @param {function?} fn compare function (a, b)
   * @returns {number} index of value, -1 if not found
   */
  export function search<T>(x: T[], v: T, fn?: compareFn<T>): number;

  /**
   * Searches a value throughout.
   * @param {Array} x an array
   * @param {*} v search value
   * @param {function?} fn compare function (a, b)
   * @returns {Array<number>} indices of value
   */
  export function searchAll<T>(x: T[], v: T, fn?: compareFn<T>): number[];

  /**
   * Searches a value from right.
   * @param {Array} x an array
   * @param {*} v search value
   * @param {function?} fn compare function (a, b)
   * @returns {number} index of value, -1 if not found
   */
  export function searchRight<T>(x: T[], v: T, fn?: compareFn<T>): number;

  /**
   * Sets value at index (+ve, -ve).
   * @param {Array} x an array (updated)
   * @param {number} i index (-ve: from right)
   * @param {*} v value
   * @returns {Array} x
   */
  export function set$<T>(x: T[], i: number, v: T): T[];

  /**
   * Sets value at index (+ve, -ve).
   * @param {Array} x an array
   * @param {number} i index (-ve: from right)
   * @param {*} v value
   * @returns {Array} set array
   */
  export function set<T>(x: T[], i: number, v: T): T[];

  /**
   * Removes first value.
   * @param {Array} x an array
   * @returns {Array} [value, array]
   */
  export function shift<T>(x: T[]): [T, T[]];

  /**
   * Rearranges values in arbitrary order.
   * @param {Array} x an array (updated)
   * @param {number?} n random seed 0->1
   * @returns {Array} x
   */
  export function shuffle$<T>(x: T[], n?: number): T[];

  /**
   * Rearranges values in arbitrary order.
   * @param {Array} x an array
   * @param {number?} n random seed
   * @returns {Array}
   */
  export function shuffle<T>(x: T[], n?: number): T[];

  /**
   * Keeps only the selected region.
   * @param {Array} x an array (updated)
   * @param {number} i start index (0)
   * @param {number} I end index (x.length)
   * @returns {Array} x
   */
  export function slice$<T>(x: T[], i?: number, I?: number): T[];

  /**
   * Arranges values in an order.
   * @param {Array} x an array
   * @param {function?} fn compare function (a, b)
   * @returns {Array} sorted array
   */
  export function sort<T>(x: T[], fn?: compareFn<T>): T[];

  /**
   * Arranges values in an order.
   * @param {Array} x an array (updated)
   * @param {function?} fn map function (v, i, x)
   * @param {object?} ths this argument
   * @returns {Array} x
   */
  export function sortOn$<T, U>(x: T[], fn?: mapFn<T, U>, ths?: object): T[];

  /**
   * Arranges values in an order.
   * @param {Array} x an array
   * @param {function?} fn map function (v, i, x)
   * @param {object?} ths this argument
   * @returns {Array}
   */
  export function sortOn<T, U>(x: T[], fn?: mapFn<T, U>, ths?: object): T[];

  /**
   * Breaks array considering filter as separator.
   * @param {Array} x an array
   * @param {function} fn filter function (v, i, x)
   * @param {object?} ths this argument
   * @returns {Array<Array>} [...pieces]
   */
  export function split<T>(x: T[], fn: (v: T, i: number, x?: T[]) => T[], ths?: object): T[][];

  /**
   * Lists all possible partial sequences.
   * @param {Array} x an array
   * @returns {Iterable<Array>} ...subsequences
   */
  export function subsequences<T>(x: T[]): Iterable<T[]>;

  /**
   * Lists all possible suffixes.
   * @param {Array} x an array
   * @returns {Iterable<Array>} ...suffixes
   */
  export function suffixes<T>(x: T[]): Iterable<T[]>;

  /**
   * Exchanges two values.
   * @param {Array} x an array (updated)
   * @param {number} i an index
   * @param {number} j another index
   * @returns {Array} x
   */
  export function swap$<T>(x: T[], i: number, j: number): T[];

  /**
   * Exchanges two values.
   * @param {Array} x an array
   * @param {number} i an index
   * @param {number} j another index
   * @returns {Array}
   */
  export function swap<T>(x: T[], i: number, j: number): T[];

  /**
   * Gets values except first.
   * @param {Array} x an array
   * @returns {Array} except first
   */
  export function tail<T>(x: T[]): T[];

  /**
   * Gives union of first array with another.
   * @param {Array} x an array (updated)
   * @param {Array} y another array
   * @param {function?} fn compare function (a, b)
   * @returns {Array} x
   */
  export function union$<T>(x: T[], y: T[], fn?: compareFn<T>): T[];

  /**
   * Gives union of first array with another.
   * @param {Array} x an array
   * @param {Array} y another array
   * @param {function?} fn compare function (a, b)
   * @returns {Array}
   */
  export function union<T>(x: T[], y: T[], fn?: compareFn<T>): T[];

  /**
   * Gives union of first array with another.
   * @param {Array} x an array (updated)
   * @param {Array} y another array
   * @param {function?} fn map function (v, i, x)
   * @param {object?} ths this argument
   * @returns {Array} x
   */
  export function unionOn$<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): T[];

  /**
   * Gives union of first array with another.
   * @param {Array} x an array
   * @param {Array} y another array
   * @param {function?} fn map function (v, i, x)
   * @param {object?} ths this argument
   * @returns {Array}
   */
  export function unionOn<T, U>(x: T[], y: T[], fn?: mapFn<T, U>, ths?: object): T[];

  /**
   * Removes duplicate elements.
   * @param {Array} x an array
   * @param {function?} fn compare function (a, b)
   * @returns {Array} unique values
   */
  export function unique<T>(x: T[], fn?: compareFn<T>): T[];

  /**
   * Removes duplicate elements.
   * @param {Array} x an array
   * @param {function?} fn map function (v, i, x)
   * @param {object?} ths this argument
   * @returns {Array} unique values
   */
  export function uniqueOn<T, U>(x: T[], fn?: mapFn<T, U>, ths?: object): T[];

  /**
   * Adds values to the start.
   * @param {Array} x an array
   * @param {...any} vs values to add
   * @returns {Array} unshifted
   */
  export function unshift<T>(x: T[], ...vs: T[]): T[];

  /**
   * Combines values from n arrays, with a function.
   * @param {Array<Array>} xs n arrays
   * @param {function?} fn combine function (a, b, c, ...)
   * @param {object?} ths this argument
   * @returns {Array<Array>} combined values
   */
  export function zip<T, U>(xs: T[][], fn?: (...args: T[]) => U, ths?: object): U[];
}
