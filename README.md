A collection of array functions that complement JavaScript's built-in [Array`][array] methods.

▌
📦 [JSR](https://jsr.io/@nodef/extra-array),
📦 [NPM](https://www.npmjs.com/package/@nodef/extra-array),
🌐 [Web](https://cdn.jsdelivr.net/npm/@nodef/extra-array.web),
📰 [Docs](https://jsr.io/@nodef/extra-array/doc).

This package provides a **comprehensive set of array functions** with which you can **generate** an array, **clone** it, query **about** it, get non-negative **indices**, manage its **length**, **get/set** elements, fully or partially **sort** it, obtain **minimum(s)/maximum(s)**, **compare** it with another array, get a **part** of it, **search a value**, obtain all possible **arrangements** or **random arrangements**, **find** an element, **take/drop** elements or **scan** from its beginning or its end, **search** the index of a part of it, perform **functional** operations, **flatten** multi-level arrays, obtain **prefix sum**, **manipulate** it in various ways, **count/partition** elements, **split** it, **concatenate/join** multiple arrays, **rearrange** elements within it, or perform **set operations** upon it.

Following a consistent naming convention, **all functions except `from*()` take the array as the 1st parameter**. Some functions operate on a specified *range* in the array and are named `ranged*()` (such as `rangedPartialSort()`). Functions like [swap] are **pure** and do not modify the array, while functions like [swap$] **do modify (update)** the array itself — the `$` suffix marks mutation. Some functions accept a *map function* for faster comparison (such as [unique]). Further, functions which return an *iterable* instead of an array are prefixed with `i` (such as [isubsequences]). Some names are borrowed from other languages such as *Haskell*, *Python*, *Java*, and *Processing*.

The additions cover:

- **Generation**: [fromRange], [fromInvocation], [fromApplication], [fromIterable].
- **Cloning**: [shallowClone], [deepClone].
- **Inspection**: [is], [keys], [values], [entries].
- **Access**: [get], [set], [getPath], [swap], [remove] and their mutating `$` variants.
- **Ordering**: [sort], [partialSort], [isSorted], [minimum], [maximum], [range].
- **Selection**: [head], [tail], [slice], [take], [drop], [scanWhile].
- **Search**: [searchValue], [searchInfix], [searchSubsequence], [indexOf], [search].
- **Transformation**: [map], [filter], [flat], [exclusiveScan], [adjacentCombine].
- **Manipulation**: [fill], [push], [splice], [copyWithin], [rotate].
- **Partitioning**: [count], [partition], [split], [cutAt], [chunk].
- **Combination**: [concat], [zip], [interleave], [cartesianProduct].
- **Set operations**: [unique], [union], [intersection], [difference], [symmetricDifference].

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

<br>

```javascript
import * as xarray from "jsr:@nodef/extra-array";


// 1. Get value at an index (supports negative indices).
const a = [1, 2, 3];
xarray.get(a, -1);
// → 3


// 2. Swap two values (pure, does not modify the array).
xarray.swap([1, 2, 3, 4], 0, 1);
// → [ 2, 1, 3, 4 ]


// 3. Rotate values (pure).
xarray.rotate([1, 2, 3, 4], 1);
// → [ 2, 3, 4, 1 ]


// 4. Obtain all possible arrangements.
xarray.permutations([1, 2, 3]);
// → [
//   [],          [ 1 ],
//   [ 2 ],       [ 3 ],
//   [ 1, 2 ],    [ 1, 3 ],
//   [ 2, 1 ],    [ 2, 3 ],
//   [ 3, 1 ],    [ 3, 2 ],
//   [ 1, 2, 3 ], [ 1, 3, 2 ],
//   [ 2, 1, 3 ], [ 2, 3, 1 ],
//   [ 3, 1, 2 ], [ 3, 2, 1 ]
// ]
```

<br>
<br>


## Index

### Generation

| Property | Description |
|  ----  |  ----  |
| [fromRange] | Generate array from given number range. |
| [fromInvocation] | Generate array from repeated function invocation. |
| [fromApplication] | Generate array from repeated function application. |
| [fromIterable] | Convert an iterable to array. |
| [fromIterable$] | Convert an iterable to array! |

### Cloning

| Property | Description |
|  ----  |  ----  |
| [shallowClone] | Shallow clone an array. |
| [deepClone] | Deep clone an array. |

### Inspection

| Property | Description |
|  ----  |  ----  |
| [is] | Check if value is an array. |
| [keys] | Obtain all indices. |
| [values] | Get all values. |
| [entries] | Obtain all index-value pairs. |

### Indices

| Property | Description |
|  ----  |  ----  |
| [index] | Get zero-based index for an element in array. |
| [indexRange] | Get zero-based index range for part of array. |

### Length

| Property | Description |
|  ----  |  ----  |
| [isEmpty] | Check if an array is empty. |
| [length] | Find the length of an array. |
| [resize$] | Resize an array to given length! |
| [clear$] | Remove all elements from an array! |

### Get/Set

| Property | Description |
|  ----  |  ----  |
| [get] | Get value at index. |
| [getAll] | Get values at indices. |
| [getPath] | Get value at path in a nested array. |
| [hasPath] | Check if nested array has a path. |
| [set] | Set value at index. |
| [set$] | Set value at index! |
| [setPath$] | Set value at path in a nested array! |
| [swap] | Exchange two values. |
| [swap$] | Exchange two values! |
| [swapRanges] | Exchange two ranges of values. |
| [swapRanges$] | Exchange two ranges of values! |
| [remove] | Remove value at index. |
| [remove$] | Remove value at index! |
| [removePath$] | Remove value at path in a nested array! |

### Sorting

| Property | Description |
|  ----  |  ----  |
| [isSorted] | Examine if array is sorted. |
| [hasUnsortedValue] | Examine if array has an unsorted value. |
| [searchUnsortedValue] | Find first index of an unsorted value. |
| [sort] | Arrange values in order. |
| [sort$] | Arrange values in order! |
| [partialSort] | Partially arrange values in order. |
| [partialSort$] | Partially arrange values in order! |

### Minimum/Maximum

| Property | Description |
|  ----  |  ----  |
| [minimum] | Find first smallest value. |
| [minimumEntry] | Find first smallest entry. |
| [maximum] | Find first largest value. |
| [maximumEntry] | Find first largest entry. |
| [range] | Find smallest and largest values. |
| [rangeEntries] | Find smallest and largest entries. |
| [minimums] | Find smallest values. |
| [minimumEntries] | Find smallest entries. |
| [maximums] | Find largest values. |
| [maximumEntries] | Find largest entries. |
| [searchMinimumValue] | Find first index of minimum value. |
| [searchMaximumValue] | Find first index of maximum value. |
| [searchMinimumValues] | Find indices of minimum values. |
| [searchMaximumValues] | Find indices of maximum values. |

### Comparison

| Property | Description |
|  ----  |  ----  |
| [isEqual] | Examine if two arrays are equal. |
| [compare] | Compare two arrays (lexicographically). |

### Parts

| Property | Description |
|  ----  |  ----  |
| [head] | Get first value. |
| [tail] | Get values except first. |
| [init] | Get values except last. |
| [last] | Get last value. |
| [middle] | Get values from middle. |
| [slice] | Get part of an array. |
| [slice$] | Get part of an array! |

### Search

| Property | Description |
|  ----  |  ----  |
| [includes] | Check if array has a value. |
| [hasValue] | Examine if array has a value. |
| [searchValue] | Find first index of a value. |
| [searchValueRight] | Find last index of a value. |
| [searchValueAll] | Find indices of value. |
| [searchAdjacentDuplicateValue] | Find first index of an adjacent duplicate value. |
| [searchMismatchedValue] | Find first index where two arrays differ. |

### Contains

| Property | Description |
|  ----  |  ----  |
| [hasPrefix] | Examine if array starts with a prefix. |
| [hasSuffix] | Examine if array ends with a suffix. |
| [hasInfix] | Examine if array contains an infix. |
| [hasSubsequence] | Examine if array has a subsequence. |
| [hasPermutation] | Examine if array has a permutation. |
| [prefixes] | Obtain all possible prefixes. |
| [suffixes] | Obtain all possible suffixes. |
| [infixes] | Obtain all possible infixes. |
| [subsequences] | Obtain all possible subsequences. |
| [permutations] | Obtain all possible permutations. |
| [searchInfix] | Find first index of an infix. |
| [searchInfixRight] | Find last index of an infix. |
| [searchInfixAll] | Find indices of an infix. |
| [searchSubsequence] | Find first index of a subsequence. |

### Random

| Property | Description |
|  ----  |  ----  |
| [randomValue] | Pick an arbitrary value. |
| [randomPrefix] | Pick an arbitrary prefix. |
| [randomSuffix] | Pick an arbitrary suffix. |
| [randomInfix] | Pick an arbitrary infix. |
| [randomSubsequence] | Pick an arbitrary subsequence. |
| [randomPermutation] | Pick an arbitrary permutation. |
| [randomPermutation$] | Pick an arbitrary permutation! |

### Find

| Property | Description |
|  ----  |  ----  |
| [find] | Find first value passing a test. |
| [findRight] | Find last value passing a test. |

### Take/Drop

| Property | Description |
|  ----  |  ----  |
| [take] | Keep first n values only. |
| [takeRight] | Keep last n values only. |
| [takeWhile] | Keep values from left, while a test passes. |
| [takeWhileRight] | Keep values from right, while a test passes. |
| [drop] | Discard first n values only. |
| [dropRight] | Discard last n values only. |
| [dropWhile] | Discard values from left, while a test passes. |
| [dropWhileRight] | Discard values from right, while a test passes. |

### Scan

| Property | Description |
|  ----  |  ----  |
| [scanWhile] | Scan from left, while a test passes. |
| [scanWhileRight] | Scan from right, while a test passes. |
| [scanUntil] | Scan from left, until a test passes. |
| [scanUntilRight] | Scan from right, until a test passes. |

### Search Indices

| Property | Description |
|  ----  |  ----  |
| [indexOf] | Find first index of a value. |
| [lastIndexOf] | Find last index of a value. |
| [search] | Find index of first value passing a test. |
| [searchRight] | Find index of last value passing a test. |
| [searchAll] | Find indices of values passing a test. |

### Functional

| Property | Description |
|  ----  |  ----  |
| [forEach] | Call a function for each value. |
| [some] | Examine if any value satisfies a test. |
| [every] | Examine if all values satisfy a test. |
| [map] | Transform values of an array. |
| [map$] | Transform values of an array! |
| [reduce] | Reduce values of array to a single value. |
| [reduceRight] | Reduce values from right, to a single value. |
| [filter] | Keep values which pass a test. |
| [filter$] | Keep values which pass a test! |
| [filterAt] | Keep values at given indices. |
| [reject] | Discard values which pass a test. |
| [reject$] | Discard values which pass a test! |
| [rejectAt] | Discard values at given indices. |

### Flatten

| Property | Description |
|  ----  |  ----  |
| [flat] | Flatten nested array to given depth. |
| [flatMap] | Flatten nested array, based on map function. |

### Prefix Scan

| Property | Description |
|  ----  |  ----  |
| [exclusiveScan] | Perform exclusive prefix scan from left to right. |
| [exclusiveScan$] | Perform exclusive prefix scan from left to right! |
| [inclusiveScan] | Perform inclusive prefix scan from left to right. |
| [inclusiveScan$] | Perform inclusive prefix scan from left to right! |
| [adjacentCombine] | Combine adjacent values of an array. |
| [adjacentCombine$] | Combine adjacent values of an array! |

### Combine

| Property | Description |
|  ----  |  ----  |
| [intersperse] | Place a separator between every value. |
| [interpolate] | Estimate new values between existing ones. |
| [intermix] | Place values of an array between another. |
| [interleave] | Place values from iterables alternately. |
| [zip] | Combine values from arrays. |

### Manipulate

| Property | Description |
|  ----  |  ----  |
| [fill] | Fill with given value. |
| [fill$] | Fill with given value! |
| [push] | Add value to the end. |
| [push$] | Add values to the end! |
| [pop] | Remove last value. |
| [pop$] | Remove last value! |
| [shift] | Remove first value. |
| [shift$] | Remove first value! |
| [unshift] | Add values to the start. |
| [unshift$] | Add values to the start! |
| [copy] | Copy part of array to another. |
| [copy$] | Copy part of array to another! |
| [copyWithin] | Copy part of array within. |
| [copyWithin$] | Copy part of array within! |
| [moveWithin] | Move part of array within. |
| [moveWithin$] | Move part of array within! |
| [splice] | Remove or replace existing values. |
| [splice$] | Remove or replace existing values! |

### Count/Partition

| Property | Description |
|  ----  |  ----  |
| [count] | Count values which satisfy a test. |
| [countEach] | Count occurrences of each distinct value. |
| [partition] | Segregate values by test result. |
| [partitionEach] | Segregate each distinct value. |

### Split

| Property | Description |
|  ----  |  ----  |
| [split] | Break array considering test as separator. |
| [splitAt] | Break array considering indices as separator. |
| [cut] | Break array when test passes. |
| [cutRight] | Break array after test passes. |
| [cutAt] | Break array at given indices. |
| [cutAtRight] | Break array after given indices. |
| [group] | Keep similar values together and in order. |
| [chunk] | Break array into chunks of given size. |

### Concatenate/Join

| Property | Description |
|  ----  |  ----  |
| [concat] | Append values from arrays. |
| [concat$] | Append values from arrays! |
| [join] | Join values together into a string. |

### Rearrange

| Property | Description |
|  ----  |  ----  |
| [cycle] | Obtain values that cycle through array. |
| [repeat] | Repeat an array given times. |
| [reverse] | Reverse the values. |
| [reverse$] | Reverse the values! |
| [rotate] | Rotate values in array. |
| [rotate$] | Rotate values in array! |

### Set Operations

| Property | Description |
|  ----  |  ----  |
| [isUnique] | Examine if there are no duplicate values. |
| [isDisjoint] | Examine if arrays have no value in common. |
| [unique] | Remove duplicate values. |
| [union] | Obtain values present in any array. |
| [union$] | Obtain values present in any array! |
| [intersection] | Obtain values present in both arrays. |
| [difference] | Obtain values not present in another array. |
| [symmetricDifference] | Obtain values not present in both arrays. |
| [cartesianProduct] | Obtain cartesian product of arrays. |

<br>
<br>


## Story

An **array** is a *collection of values* stored **contiguously** in memory. Each value has a *zero-based index*, and the number of values is the array's *length*. In JavaScript, an [Array][array] is a dynamic, resizable object whose elements may be of any type, including other arrays (hence *nested arrays*). Values are accessed with bracket notation (`a[i]`) or, for nested paths, by chaining indices (`a[i][j][k]`). Because JavaScript arrays are *sparse-capable* but typically dense, contiguous access is fast; iteration with `for...of`, `Array.fromAsync()`, or `Array.from()` yields values in index order.

In JavaScript, an array can be **created** with `[]`, `Array.of()`, `Array.from()`, or `new Array(n)` (which fills with *empty slots*), and **inspected** with `Array.isArray()`, `a.length`, `a.keys()`, `a.values()`, and `a.entries()`. Values can be **appended** with `a.push()`, **prepended** with `a.unshift()`, **removed** from either end with `a.pop()`/`a.shift()`, and **spliced** in or out with `a.splice()`. Copies are made with `a.slice()`, and the array itself can be reordered with `a.sort()`, `a.reverse()`, or `a.copyWithin()`. A **part** of the array can be extracted with `a.slice(start, end)`; a **test** applied with `a.some()`, `a.every()`, or `a.find()`; and a **functional transformation** performed with `a.map()`, `a.filter()`, and `a.reduce()`. These built-ins form the *idiomatic* baseline that this package extends.

The functions in this package **mirror** these built-ins where possible (`get`, `set`, `slice`, `sort`, `map`, `filter`, `reduce`, `some`, `every`) and **add** a wide range of others that are common in functional and mathematical code: *partial sorting* (as in NumPy's `partition`), *prefix scans* (inclusive and exclusive), *range-based variants* (`ranged*()`), *iterable-returning variants* (`i*()`), *random selection* (`random*()`), and *set operations* (`union`, `intersection`, `difference`, `symmetricDifference`, `cartesianProduct`). The `$` suffix consistently denotes **in-place mutation**, so a call to `xarray.map$(a, fn)` is exactly analogous to `Array.prototype.map` but writes into the original array; the pure form `xarray.map(a, fn)` returns a new array. This separation makes it easy to *opt in* to mutation and to reason about which calls allocate.

Because the package is a **single flat module**, every function is reachable from the same import. Groupings in the [Index](#index) above are *by purpose*, not by submodule, so you can scan for the operation you want and then confirm the exact signature in the [@nodef/extra-array` docs](https://jsr.io/@nodef/extra-array/doc).

<br>
<br>


## See also

- [MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN: TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
- [Prefix sum array and difference array : Woburn C.I. PEGWiki](https://wcipeg.com/wiki/Prefix_sum_array_and_difference_array)
- [How to get the count of each distinct value in a column?](https://stackoverflow.com/q/7053902/1413259)
- [How to add region in java script file, visual studio](https://stackoverflow.com/a/51550649/1413259)
- [Operator precedence - JavaScript : MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)
- [numpy.partition - NumPy Manual](https://numpy.org/doc/stable/reference/generated/numpy.partition.html)

<br>
<br>


[![](https://raw.githubusercontent.com/qb40/designs/gh-pages/0/image/11.png)](https://wolfram77.github.io)<br>
[![ORG](https://img.shields.io/badge/org-nodef-green?logo=Org)](https://nodef.github.io)
![](https://ga-beacon.deno.dev/G-RC63DPBH3P:SH3Eq-NoQ9mwgYeHWxu7cw/github.com/nodef/extra-array)


[fromRange]: https://jsr.io/@nodef/extra-array/doc/~/fromRange
[fromInvocation]: https://jsr.io/@nodef/extra-array/doc/~/fromInvocation
[fromApplication]: https://jsr.io/@nodef/extra-array/doc/~/fromApplication
[fromIterable]: https://jsr.io/@nodef/extra-array/doc/~/fromIterable
[fromIterable$]: https://jsr.io/@nodef/extra-array/doc/~/fromIterable$
[shallowClone]: https://jsr.io/@nodef/extra-array/doc/~/shallowClone
[deepClone]: https://jsr.io/@nodef/extra-array/doc/~/deepClone
[is]: https://jsr.io/@nodef/extra-array/doc/~/is
[keys]: https://jsr.io/@nodef/extra-array/doc/~/keys
[values]: https://jsr.io/@nodef/extra-array/doc/~/values
[entries]: https://jsr.io/@nodef/extra-array/doc/~/entries
[index]: https://jsr.io/@nodef/extra-array/doc/~/index
[indexRange]: https://jsr.io/@nodef/extra-array/doc/~/indexRange
[isEmpty]: https://jsr.io/@nodef/extra-array/doc/~/isEmpty
[length]: https://jsr.io/@nodef/extra-array/doc/~/length
[resize$]: https://jsr.io/@nodef/extra-array/doc/~/resize$
[clear$]: https://jsr.io/@nodef/extra-array/doc/~/clear$
[get]: https://jsr.io/@nodef/extra-array/doc/~/get
[getAll]: https://jsr.io/@nodef/extra-array/doc/~/getAll
[getPath]: https://jsr.io/@nodef/extra-array/doc/~/getPath
[hasPath]: https://jsr.io/@nodef/extra-array/doc/~/hasPath
[set]: https://jsr.io/@nodef/extra-array/doc/~/set
[set$]: https://jsr.io/@nodef/extra-array/doc/~/set$
[setPath$]: https://jsr.io/@nodef/extra-array/doc/~/setPath$
[swap]: https://jsr.io/@nodef/extra-array/doc/~/swap
[swap$]: https://jsr.io/@nodef/extra-array/doc/~/swap$
[swapRanges]: https://jsr.io/@nodef/extra-array/doc/~/swapRanges
[swapRanges$]: https://jsr.io/@nodef/extra-array/doc/~/swapRanges$
[remove]: https://jsr.io/@nodef/extra-array/doc/~/remove
[remove$]: https://jsr.io/@nodef/extra-array/doc/~/remove$
[removePath$]: https://jsr.io/@nodef/extra-array/doc/~/removePath$
[isSorted]: https://jsr.io/@nodef/extra-array/doc/~/isSorted
[hasUnsortedValue]: https://jsr.io/@nodef/extra-array/doc/~/hasUnsortedValue
[searchUnsortedValue]: https://jsr.io/@nodef/extra-array/doc/~/searchUnsortedValue
[sort]: https://jsr.io/@nodef/extra-array/doc/~/sort
[sort$]: https://jsr.io/@nodef/extra-array/doc/~/sort$
[partialSort]: https://jsr.io/@nodef/extra-array/doc/~/partialSort
[partialSort$]: https://jsr.io/@nodef/extra-array/doc/~/partialSort$
[minimum]: https://jsr.io/@nodef/extra-array/doc/~/minimum
[minimumEntry]: https://jsr.io/@nodef/extra-array/doc/~/minimumEntry
[maximum]: https://jsr.io/@nodef/extra-array/doc/~/maximum
[maximumEntry]: https://jsr.io/@nodef/extra-array/doc/~/maximumEntry
[range]: https://jsr.io/@nodef/extra-array/doc/~/range
[rangeEntries]: https://jsr.io/@nodef/extra-array/doc/~/rangeEntries
[minimums]: https://jsr.io/@nodef/extra-array/doc/~/minimums
[minimumEntries]: https://jsr.io/@nodef/extra-array/doc/~/minimumEntries
[maximums]: https://jsr.io/@nodef/extra-array/doc/~/maximums
[maximumEntries]: https://jsr.io/@nodef/extra-array/doc/~/maximumEntries
[searchMinimumValue]: https://jsr.io/@nodef/extra-array/doc/~/searchMinimumValue
[searchMaximumValue]: https://jsr.io/@nodef/extra-array/doc/~/searchMaximumValue
[searchMinimumValues]: https://jsr.io/@nodef/extra-array/doc/~/searchMinimumValues
[searchMaximumValues]: https://jsr.io/@nodef/extra-array/doc/~/searchMaximumValues
[isEqual]: https://jsr.io/@nodef/extra-array/doc/~/isEqual
[compare]: https://jsr.io/@nodef/extra-array/doc/~/compare
[head]: https://jsr.io/@nodef/extra-array/doc/~/head
[tail]: https://jsr.io/@nodef/extra-array/doc/~/tail
[init]: https://jsr.io/@nodef/extra-array/doc/~/init
[last]: https://jsr.io/@nodef/extra-array/doc/~/last
[middle]: https://jsr.io/@nodef/extra-array/doc/~/middle
[slice]: https://jsr.io/@nodef/extra-array/doc/~/slice
[slice$]: https://jsr.io/@nodef/extra-array/doc/~/slice$
[includes]: https://jsr.io/@nodef/extra-array/doc/~/includes
[hasValue]: https://jsr.io/@nodef/extra-array/doc/~/hasValue
[searchValue]: https://jsr.io/@nodef/extra-array/doc/~/searchValue
[searchValueRight]: https://jsr.io/@nodef/extra-array/doc/~/searchValueRight
[searchValueAll]: https://jsr.io/@nodef/extra-array/doc/~/searchValueAll
[searchAdjacentDuplicateValue]: https://jsr.io/@nodef/extra-array/doc/~/searchAdjacentDuplicateValue
[searchMismatchedValue]: https://jsr.io/@nodef/extra-array/doc/~/searchMismatchedValue
[hasPrefix]: https://jsr.io/@nodef/extra-array/doc/~/hasPrefix
[hasSuffix]: https://jsr.io/@nodef/extra-array/doc/~/hasSuffix
[hasInfix]: https://jsr.io/@nodef/extra-array/doc/~/hasInfix
[hasSubsequence]: https://jsr.io/@nodef/extra-array/doc/~/hasSubsequence
[hasPermutation]: https://jsr.io/@nodef/extra-array/doc/~/hasPermutation
[prefixes]: https://jsr.io/@nodef/extra-array/doc/~/prefixes
[iprefixes]: https://jsr.io/@nodef/extra-array/doc/~/iprefixes
[suffixes]: https://jsr.io/@nodef/extra-array/doc/~/suffixes
[isuffixes]: https://jsr.io/@nodef/extra-array/doc/~/isuffixes
[infixes]: https://jsr.io/@nodef/extra-array/doc/~/infixes
[iinfixes]: https://jsr.io/@nodef/extra-array/doc/~/iinfixes
[subsequences]: https://jsr.io/@nodef/extra-array/doc/~/subsequences
[isubsequences]: https://jsr.io/@nodef/extra-array/doc/~/isubsequences
[permutations]: https://jsr.io/@nodef/extra-array/doc/~/permutations
[ipermutations]: https://jsr.io/@nodef/extra-array/doc/~/ipermutations
[searchInfix]: https://jsr.io/@nodef/extra-array/doc/~/searchInfix
[searchInfixRight]: https://jsr.io/@nodef/extra-array/doc/~/searchInfixRight
[searchInfixAll]: https://jsr.io/@nodef/extra-array/doc/~/searchInfixAll
[searchSubsequence]: https://jsr.io/@nodef/extra-array/doc/~/searchSubsequence
[randomValue]: https://jsr.io/@nodef/extra-array/doc/~/randomValue
[randomPrefix]: https://jsr.io/@nodef/extra-array/doc/~/randomPrefix
[randomSuffix]: https://jsr.io/@nodef/extra-array/doc/~/randomSuffix
[randomInfix]: https://jsr.io/@nodef/extra-array/doc/~/randomInfix
[randomSubsequence]: https://jsr.io/@nodef/extra-array/doc/~/randomSubsequence
[randomPermutation]: https://jsr.io/@nodef/extra-array/doc/~/randomPermutation
[randomPermutation$]: https://jsr.io/@nodef/extra-array/doc/~/randomPermutation$
[find]: https://jsr.io/@nodef/extra-array/doc/~/find
[findRight]: https://jsr.io/@nodef/extra-array/doc/~/findRight
[take]: https://jsr.io/@nodef/extra-array/doc/~/take
[takeRight]: https://jsr.io/@nodef/extra-array/doc/~/takeRight
[takeWhile]: https://jsr.io/@nodef/extra-array/doc/~/takeWhile
[takeWhileRight]: https://jsr.io/@nodef/extra-array/doc/~/takeWhileRight
[drop]: https://jsr.io/@nodef/extra-array/doc/~/drop
[dropRight]: https://jsr.io/@nodef/extra-array/doc/~/dropRight
[dropWhile]: https://jsr.io/@nodef/extra-array/doc/~/dropWhile
[dropWhileRight]: https://jsr.io/@nodef/extra-array/doc/~/dropWhileRight
[scanWhile]: https://jsr.io/@nodef/extra-array/doc/~/scanWhile
[scanWhileRight]: https://jsr.io/@nodef/extra-array/doc/~/scanWhileRight
[scanUntil]: https://jsr.io/@nodef/extra-array/doc/~/scanUntil
[scanUntilRight]: https://jsr.io/@nodef/extra-array/doc/~/scanUntilRight
[indexOf]: https://jsr.io/@nodef/extra-array/doc/~/indexOf
[lastIndexOf]: https://jsr.io/@nodef/extra-array/doc/~/lastIndexOf
[search]: https://jsr.io/@nodef/extra-array/doc/~/search
[searchRight]: https://jsr.io/@nodef/extra-array/doc/~/searchRight
[searchAll]: https://jsr.io/@nodef/extra-array/doc/~/searchAll
[forEach]: https://jsr.io/@nodef/extra-array/doc/~/forEach
[some]: https://jsr.io/@nodef/extra-array/doc/~/some
[every]: https://jsr.io/@nodef/extra-array/doc/~/every
[map]: https://jsr.io/@nodef/extra-array/doc/~/map
[map$]: https://jsr.io/@nodef/extra-array/doc/~/map$
[reduce]: https://jsr.io/@nodef/extra-array/doc/~/reduce
[reduceRight]: https://jsr.io/@nodef/extra-array/doc/~/reduceRight
[filter]: https://jsr.io/@nodef/extra-array/doc/~/filter
[filter$]: https://jsr.io/@nodef/extra-array/doc/~/filter$
[filterAt]: https://jsr.io/@nodef/extra-array/doc/~/filterAt
[reject]: https://jsr.io/@nodef/extra-array/doc/~/reject
[reject$]: https://jsr.io/@nodef/extra-array/doc/~/reject$
[rejectAt]: https://jsr.io/@nodef/extra-array/doc/~/rejectAt
[flat]: https://jsr.io/@nodef/extra-array/doc/~/flat
[flatMap]: https://jsr.io/@nodef/extra-array/doc/~/flatMap
[exclusiveScan]: https://jsr.io/@nodef/extra-array/doc/~/exclusiveScan
[exclusiveScan$]: https://jsr.io/@nodef/extra-array/doc/~/exclusiveScan$
[inclusiveScan]: https://jsr.io/@nodef/extra-array/doc/~/inclusiveScan
[inclusiveScan$]: https://jsr.io/@nodef/extra-array/doc/~/inclusiveScan$
[adjacentCombine]: https://jsr.io/@nodef/extra-array/doc/~/adjacentCombine
[adjacentCombine$]: https://jsr.io/@nodef/extra-array/doc/~/adjacentCombine$
[intersperse]: https://jsr.io/@nodef/extra-array/doc/~/intersperse
[interpolate]: https://jsr.io/@nodef/extra-array/doc/~/interpolate
[intermix]: https://jsr.io/@nodef/extra-array/doc/~/intermix
[interleave]: https://jsr.io/@nodef/extra-array/doc/~/interleave
[zip]: https://jsr.io/@nodef/extra-array/doc/~/zip
[fill]: https://jsr.io/@nodef/extra-array/doc/~/fill
[fill$]: https://jsr.io/@nodef/extra-array/doc/~/fill$
[push]: https://jsr.io/@nodef/extra-array/doc/~/push
[push$]: https://jsr.io/@nodef/extra-array/doc/~/push$
[pop]: https://jsr.io/@nodef/extra-array/doc/~/pop
[pop$]: https://jsr.io/@nodef/extra-array/doc/~/pop$
[shift]: https://jsr.io/@nodef/extra-array/doc/~/shift
[shift$]: https://jsr.io/@nodef/extra-array/doc/~/shift$
[unshift]: https://jsr.io/@nodef/extra-array/doc/~/unshift
[unshift$]: https://jsr.io/@nodef/extra-array/doc/~/unshift$
[copy]: https://jsr.io/@nodef/extra-array/doc/~/copy
[copy$]: https://jsr.io/@nodef/extra-array/doc/~/copy$
[copyWithin]: https://jsr.io/@nodef/extra-array/doc/~/copyWithin
[copyWithin$]: https://jsr.io/@nodef/extra-array/doc/~/copyWithin$
[moveWithin]: https://jsr.io/@nodef/extra-array/doc/~/moveWithin
[moveWithin$]: https://jsr.io/@nodef/extra-array/doc/~/moveWithin$
[splice]: https://jsr.io/@nodef/extra-array/doc/~/splice
[splice$]: https://jsr.io/@nodef/extra-array/doc/~/splice$
[count]: https://jsr.io/@nodef/extra-array/doc/~/count
[countEach]: https://jsr.io/@nodef/extra-array/doc/~/countEach
[partition]: https://jsr.io/@nodef/extra-array/doc/~/partition
[partitionEach]: https://jsr.io/@nodef/extra-array/doc/~/partitionEach
[split]: https://jsr.io/@nodef/extra-array/doc/~/split
[splitAt]: https://jsr.io/@nodef/extra-array/doc/~/splitAt
[cut]: https://jsr.io/@nodef/extra-array/doc/~/cut
[cutRight]: https://jsr.io/@nodef/extra-array/doc/~/cutRight
[cutAt]: https://jsr.io/@nodef/extra-array/doc/~/cutAt
[cutAtRight]: https://jsr.io/@nodef/extra-array/doc/~/cutAtRight
[group]: https://jsr.io/@nodef/extra-array/doc/~/group
[chunk]: https://jsr.io/@nodef/extra-array/doc/~/chunk
[concat]: https://jsr.io/@nodef/extra-array/doc/~/concat
[concat$]: https://jsr.io/@nodef/extra-array/doc/~/concat$
[join]: https://jsr.io/@nodef/extra-array/doc/~/join
[cycle]: https://jsr.io/@nodef/extra-array/doc/~/cycle
[repeat]: https://jsr.io/@nodef/extra-array/doc/~/repeat
[reverse]: https://jsr.io/@nodef/extra-array/doc/~/reverse
[reverse$]: https://jsr.io/@nodef/extra-array/doc/~/reverse$
[rotate]: https://jsr.io/@nodef/extra-array/doc/~/rotate
[rotate$]: https://jsr.io/@nodef/extra-array/doc/~/rotate$
[isUnique]: https://jsr.io/@nodef/extra-array/doc/~/isUnique
[isDisjoint]: https://jsr.io/@nodef/extra-array/doc/~/isDisjoint
[unique]: https://jsr.io/@nodef/extra-array/doc/~/unique
[union]: https://jsr.io/@nodef/extra-array/doc/~/union
[union$]: https://jsr.io/@nodef/extra-array/doc/~/union$
[intersection]: https://jsr.io/@nodef/extra-array/doc/~/intersection
[difference]: https://jsr.io/@nodef/extra-array/doc/~/difference
[symmetricDifference]: https://jsr.io/@nodef/extra-array/doc/~/symmetricDifference
[cartesianProduct]: https://jsr.io/@nodef/extra-array/doc/~/cartesianProduct
