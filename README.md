An [Array] is a collection of values, stored contiguously.<br>
📦 [Node.js](https://www.npmjs.com/package/extra-array),
🌐 [Web](https://www.npmjs.com/package/extra-array.web),
📜 [Files](https://unpkg.com/extra-array/),
📰 [Docs](https://nodef.github.io/extra-array/),
📘 [Wiki](https://github.com/nodef/extra-array/wiki/).

This package includes common array functions related to querying **about**
arrays, **generating** them, **comparing** one with another, finding their
**length**, **getting** and **setting** elements, obtaining its **properties**,
getting a **part** of it, **rearranging** elements in it, **finding** an element
of a subset of elements in it, performing **functional** operations,
**manipulating** it in various ways, **combining** together arrays or its
elements, of performing **set operations** upon it.

All functions except `from*()` take array as 1st parameter. Methods like
`swap()` are pure and do not modify the array itself, while methods like
`swap$()` *do modify (update)* the array itself. Some methods accept a map
function for *faster comparision* (like [unique]). I find the map-approach
beautiful, which I learned from Haskell's `sortOn()`. You can notice that I have
followed Javascript naming scheme as far as possible. Some names are borrowed
from Haskell, Python, Java, Processing.

This package is available in *Node.js* and *Web* formats. To use it on the web,
simply use the `extra_array` global variable after loading with a `<script>`
tag from the [jsDelivr CDN].

> Stability: [Experimental](https://www.youtube.com/watch?v=L1j93RnIxEo).

[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[jsDelivr CDN]: https://cdn.jsdelivr.net/npm/extra-array.web/index.js

<br>

```javascript
const xarray = require('extra-array');
// import * as xarray from "extra-array";
// import * as xarray from "https://unpkg.com/extra-array/index.mjs"; (deno)

var x = [1, 2, 3];
xarray.get(x, -1);
// → 3

var x = [1, 2, 3, 4];
xarray.swap(x, 0, 1);
// → [2, 1, 3, 4]

var x = [1, 2, 3, 4];
xarray.rotate(x, 1);
// → [4, 1, 2, 3]

[...xarray.permutations([1, 2, 3])];
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

| Property | Description |
|  ----  |  ----  |
| [is] | Check if value is an array. |
| [keys] | List all indices. |
| [values] | List all values. |
| [entries] | List all index-value pairs. |
|  |  |
| [from] | Convert an iterable to array. |
| [from$] | Convert an iterable to array. |
| [fromRange] | Generate array from given number range. |
| [fromInvocation] | Generate array from repeated function invocation. |
| [fromApplication] | Generate array from repeated function application. |
|  |  |
| [compare] | Compare two arrays (lexicographically). |
| [isEqual] | Check if two arrays are equal. |
|  |  |
| [index] | Get zero-based index for element in array. |
| [indexRange] | Get index range for part of array. |
| [length] | Find the length of an array. |
| [isEmpty] | Check if an array is empty. |
|  |  |
| [get] | Get value at index. |
| [getAll] | Get values at indices. |
| [getPath] | Get value at path in a nested array. |
| [hasPath] | Check if nested array has a path. |
| [set] | Set value at index. |
| [set$] | Set value at index. |
| [setPath$] | Set value at path in a nested array. |
| [swap] | Exchange two values. |
| [swap$] | Exchange two values. |
| [remove] | Remove value at index. |
| [remove$] | Remove value at index. |
| [removePath$] | Remove value at path in a nested array. |
|  |  |
| [count] | Count values which satisfy a test. |
| [countAs] | Count occurrences of values. |
| [min] | Find smallest value. |
| [minEntry] | Find smallest entry. |
| [max] | Find largest value. |
| [maxEntry] | Find largest entry. |
| [range] | Find smallest and largest values. |
| [rangeEntries] | Find smallest and largest entries. |
|  |  |
| [slice] | Get part of an array. |
| [slice$] | Get part of an array. |
| [head] | Get first value. |
| [last] | Get last value. |
| [tail] | Get values except first. |
| [init] | Get values except last. |
| [middle] | Get values from middle. |
| [take] | Keep first n values only. |
| [takeRight] | Keep last n values only. |
| [takeWhile] | Keep values from left, while a test passes. |
| [takeWhileRight] | Keep values from right, while a test passes. |
| [drop] | Discard first n values only. |
| [dropRight] | Discard last n values only. |
| [dropWhile] | Discard values from left, while a test passes. |
| [dropWhileRight] | Discard values from right, while a test passes. |
|  |  |
| [prefixes] | List all possible prefixes. |
| [suffixes] | List all possible suffixes. |
| [infixes] | List all possible infixes. |
| [subsequences] | List all possible subsequences. |
| [permutations] | List all possible permutations. |
| [randomValue] | Pick an arbitrary value. |
| [randomPrefix] | Pick an arbitrary prefix. |
| [randomSuffix] | Pick an arbitrary suffix. |
| [randomInfix] | Pick an arbitrary infix. |
| [randomSubsequence] | Pick an arbitrary subsequence. |
| [randomPermutation] | Pick an arbitrary permutation. |
| [randomPermutation$] | Pick an arbitrary permutation. |
|  |  |
| [includes] | Check if array has a value. |
| [indexOf] | Find first index of a value. |
| [lastIndexOf] | Find last index of a value. |
| [find] | Find first value passing a test. |
| [findRight] | Find last value passing a test. |
| [scanWhile] | Scan from left, while a test passes. |
| [scanWhileRight] | Scan from right, while a test passes. |
| [scanUntil] | Scan from left, until a test passes. |
| [scanUntilRight] | Scan from right, until a test passes. |
| [search] | Find index of first value passing a test. |
| [searchRight] | Find index of last value passing a test. |
| [searchAll] | Find indices of values passing a test. |
| [searchValue] | Find first index of a value. |
| [searchValueRight] | Find last index of a value. |
| [searchValueAll] | Find indices of value. |
| [searchInfix] | Find first index of an infix. |
| [searchInfixRight] | Find last index of an infix. |
| [searchInfixAll] | Find indices of an infix. |
| [searchSubsequence] | Find first index of a subsequence. |
| [hasValue] | Check if array has a value. |
| [hasPrefix] | Check if array starts with a prefix. |
| [hasSuffix] | Check if array ends with a suffix. |
| [hasInfix] | Check if array contains an infix. |
| [hasSubsequence] | Check if array has a subsequence. |
| [hasPermutation] | Check if array has a permutation. |
|  |  |
| [forEach] | Call a function for each value. |
| [some] | Check if any value satisfies a test. |
| [every] | Check if all values satisfy a test. |
| [map] | Transform values of an array. |
| [map$] | Transform values of an array. |
| [reduce] | Reduce values of array to a single value. |
| [reduceRight] | Reduce values from right, to a single value. |
| [filter] | Keep values which pass a test. |
| [filter$] | Keep values which pass a test. |
| [filterAt] | Keep values at given indices. |
| [reject] | Discard values which pass a test. |
| [reject$] | Discard values which pass a test. |
| [rejectAt] | Discard values at given indices. |
| [accumulate] | Produce accumulating values. |
| [flat] | Flatten nested array to given depth. |
| [flatMap] | Flatten nested array, based on map function. |
| [zip] | Combine values from arrays. |
|  |  |
| [fill] | Fill with given value. |
| [fill$] | Fill with given value. |
| [sort] | Arrange values in order. |
| [sort$] | Arrange values in order. |
| [push] | Add value to the end. |
| [push$] | Add values to the end. |
| [pop] | Remove last value. |
| [pop$] | Remove last value. |
| [shift] | Remove first value. |
| [shift$] | Remove first value. |
| [unshift] | Add values to the start. |
| [unshift$] | Add values to the start. |
| [copy] | Copy part of array to another. |
| [copy$] | Copy part of array to another. |
| [copyWithin] | Copy part of array within. |
| [copyWithin$] | Copy part of array within. |
| [moveWithin] | Move part of array within. |
| [moveWithin$] | Move part of array within. |
| [splice] | Remove or replace existing values. |
| [splice$] | Remove or replace existing values. |
| [split] | Break array considering test as separator. |
| [splitAt] | Break array considering indices as separator. |
| [cut] | Break array when test passes. |
| [cutRight] | Break array after test passes. |
| [cutAt] | Break array at given indices. |
| [cutAtRight] | Break array after given indices. |
| [group] | Keep similar values together and in order. |
| [partition] | Segregate values by test result. |
| [partitionAs] | Segregate values by similarity. |
| [chunk] | Break array into chunks of given size. |
| [cycle] | Obtain values that cycle through array. |
| [repeat] | Repeat an array given times. |
| [reverse] | Reverse the values. |
| [reverse$] | Reverse the values. |
| [rotate] | Rotate values in array. |
| [rotate$] | Rotate values in array. |
| [intersperse] | Place a separator between every value. |
| [interpolate] | Estimate new values between existing ones. |
| [intermix] | Place values of an array between another. |
| [interleave] | Place values from iterables alternately. |
|  |  |
| [concat] | Append values from arrays. |
| [concat$] | Append values from arrays. |
| [join] | Join values together into a string. |
|  |  |
| [isUnique] | Check if there are no duplicate values. |
| [isDisjoint] | Check if arrays have no value in common. |
| [unique] | Remove duplicate values. |
| [union] | Obtain values present in any array. |
| [union$] | Obtain values present in any array. |
| [intersection] | Obtain values present in both arrays. |
| [difference] | Obtain values not present in another array. |
| [symmetricDifference] | Obtain values not present in both arrays. |
| [cartesianProduct] | List cartesian product of arrays. |

<br>
<br>


[![](https://img.youtube.com/vi/VYOOiIJeBOA/maxresdefault.jpg)](https://www.youtube.com/watch?v=VYOOiIJeBOA)<br>
[![ORG](https://img.shields.io/badge/org-nodef-green?logo=Org)](https://nodef.github.io)
[![DOI](https://zenodo.org/badge/133759104.svg)](https://zenodo.org/badge/latestdoi/133759104)
[![Coverage Status](https://coveralls.io/repos/github/nodef/extra-array/badge.svg?branch=master)](https://coveralls.io/github/nodef/extra-array?branch=master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/77adb3752d187f463f25/test_coverage)](https://codeclimate.com/github/nodef/extra-array/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/77adb3752d187f463f25/maintainability)](https://codeclimate.com/github/nodef/extra-array/maintainability)


[is]: https://github.com/nodef/extra-array/wiki/is
[keys]: https://github.com/nodef/extra-array/wiki/keys
[values]: https://github.com/nodef/extra-array/wiki/values
[entries]: https://github.com/nodef/extra-array/wiki/entries
[from]: https://github.com/nodef/extra-array/wiki/from
[from$]: https://github.com/nodef/extra-array/wiki/from$
[fromRange]: https://github.com/nodef/extra-array/wiki/fromRange
[fromInvocation]: https://github.com/nodef/extra-array/wiki/fromInvocation
[fromApplication]: https://github.com/nodef/extra-array/wiki/fromApplication
[compare]: https://github.com/nodef/extra-array/wiki/compare
[isEqual]: https://github.com/nodef/extra-array/wiki/isEqual
[index]: https://github.com/nodef/extra-array/wiki/index
[indexRange]: https://github.com/nodef/extra-array/wiki/indexRange
[length]: https://github.com/nodef/extra-array/wiki/length
[isEmpty]: https://github.com/nodef/extra-array/wiki/isEmpty
[get]: https://github.com/nodef/extra-array/wiki/get
[getAll]: https://github.com/nodef/extra-array/wiki/getAll
[getPath]: https://github.com/nodef/extra-array/wiki/getPath
[hasPath]: https://github.com/nodef/extra-array/wiki/hasPath
[set]: https://github.com/nodef/extra-array/wiki/set
[set$]: https://github.com/nodef/extra-array/wiki/set$
[setPath$]: https://github.com/nodef/extra-array/wiki/setPath$
[swap]: https://github.com/nodef/extra-array/wiki/swap
[swap$]: https://github.com/nodef/extra-array/wiki/swap$
[remove]: https://github.com/nodef/extra-array/wiki/remove
[remove$]: https://github.com/nodef/extra-array/wiki/remove$
[removePath$]: https://github.com/nodef/extra-array/wiki/removePath$
[count]: https://github.com/nodef/extra-array/wiki/count
[countAs]: https://github.com/nodef/extra-array/wiki/countAs
[min]: https://github.com/nodef/extra-array/wiki/min
[minEntry]: https://github.com/nodef/extra-array/wiki/minEntry
[max]: https://github.com/nodef/extra-array/wiki/max
[maxEntry]: https://github.com/nodef/extra-array/wiki/maxEntry
[range]: https://github.com/nodef/extra-array/wiki/range
[rangeEntries]: https://github.com/nodef/extra-array/wiki/rangeEntries
[slice]: https://github.com/nodef/extra-array/wiki/slice
[slice$]: https://github.com/nodef/extra-array/wiki/slice$
[head]: https://github.com/nodef/extra-array/wiki/head
[last]: https://github.com/nodef/extra-array/wiki/last
[tail]: https://github.com/nodef/extra-array/wiki/tail
[init]: https://github.com/nodef/extra-array/wiki/init
[middle]: https://github.com/nodef/extra-array/wiki/middle
[take]: https://github.com/nodef/extra-array/wiki/take
[takeRight]: https://github.com/nodef/extra-array/wiki/takeRight
[takeWhile]: https://github.com/nodef/extra-array/wiki/takeWhile
[takeWhileRight]: https://github.com/nodef/extra-array/wiki/takeWhileRight
[drop]: https://github.com/nodef/extra-array/wiki/drop
[dropRight]: https://github.com/nodef/extra-array/wiki/dropRight
[dropWhile]: https://github.com/nodef/extra-array/wiki/dropWhile
[dropWhileRight]: https://github.com/nodef/extra-array/wiki/dropWhileRight
[prefixes]: https://github.com/nodef/extra-array/wiki/prefixes
[suffixes]: https://github.com/nodef/extra-array/wiki/suffixes
[infixes]: https://github.com/nodef/extra-array/wiki/infixes
[subsequences]: https://github.com/nodef/extra-array/wiki/subsequences
[permutations]: https://github.com/nodef/extra-array/wiki/permutations
[randomValue]: https://github.com/nodef/extra-array/wiki/randomValue
[randomPrefix]: https://github.com/nodef/extra-array/wiki/randomPrefix
[randomSuffix]: https://github.com/nodef/extra-array/wiki/randomSuffix
[randomInfix]: https://github.com/nodef/extra-array/wiki/randomInfix
[randomSubsequence]: https://github.com/nodef/extra-array/wiki/randomSubsequence
[randomPermutation]: https://github.com/nodef/extra-array/wiki/randomPermutation
[randomPermutation$]: https://github.com/nodef/extra-array/wiki/randomPermutation$
[includes]: https://github.com/nodef/extra-array/wiki/includes
[indexOf]: https://github.com/nodef/extra-array/wiki/indexOf
[lastIndexOf]: https://github.com/nodef/extra-array/wiki/lastIndexOf
[find]: https://github.com/nodef/extra-array/wiki/find
[findRight]: https://github.com/nodef/extra-array/wiki/findRight
[scanWhile]: https://github.com/nodef/extra-array/wiki/scanWhile
[scanWhileRight]: https://github.com/nodef/extra-array/wiki/scanWhileRight
[scanUntil]: https://github.com/nodef/extra-array/wiki/scanUntil
[scanUntilRight]: https://github.com/nodef/extra-array/wiki/scanUntilRight
[search]: https://github.com/nodef/extra-array/wiki/search
[searchRight]: https://github.com/nodef/extra-array/wiki/searchRight
[searchAll]: https://github.com/nodef/extra-array/wiki/searchAll
[searchValue]: https://github.com/nodef/extra-array/wiki/searchValue
[searchValueRight]: https://github.com/nodef/extra-array/wiki/searchValueRight
[searchValueAll]: https://github.com/nodef/extra-array/wiki/searchValueAll
[searchInfix]: https://github.com/nodef/extra-array/wiki/searchInfix
[searchInfixRight]: https://github.com/nodef/extra-array/wiki/searchInfixRight
[searchInfixAll]: https://github.com/nodef/extra-array/wiki/searchInfixAll
[searchSubsequence]: https://github.com/nodef/extra-array/wiki/searchSubsequence
[hasValue]: https://github.com/nodef/extra-array/wiki/hasValue
[hasPrefix]: https://github.com/nodef/extra-array/wiki/hasPrefix
[hasSuffix]: https://github.com/nodef/extra-array/wiki/hasSuffix
[hasInfix]: https://github.com/nodef/extra-array/wiki/hasInfix
[hasSubsequence]: https://github.com/nodef/extra-array/wiki/hasSubsequence
[hasPermutation]: https://github.com/nodef/extra-array/wiki/hasPermutation
[forEach]: https://github.com/nodef/extra-array/wiki/forEach
[some]: https://github.com/nodef/extra-array/wiki/some
[every]: https://github.com/nodef/extra-array/wiki/every
[map]: https://github.com/nodef/extra-array/wiki/map
[map$]: https://github.com/nodef/extra-array/wiki/map$
[reduce]: https://github.com/nodef/extra-array/wiki/reduce
[reduceRight]: https://github.com/nodef/extra-array/wiki/reduceRight
[filter]: https://github.com/nodef/extra-array/wiki/filter
[filter$]: https://github.com/nodef/extra-array/wiki/filter$
[filterAt]: https://github.com/nodef/extra-array/wiki/filterAt
[reject]: https://github.com/nodef/extra-array/wiki/reject
[reject$]: https://github.com/nodef/extra-array/wiki/reject$
[rejectAt]: https://github.com/nodef/extra-array/wiki/rejectAt
[accumulate]: https://github.com/nodef/extra-array/wiki/accumulate
[flat]: https://github.com/nodef/extra-array/wiki/flat
[flatMap]: https://github.com/nodef/extra-array/wiki/flatMap
[zip]: https://github.com/nodef/extra-array/wiki/zip
[fill]: https://github.com/nodef/extra-array/wiki/fill
[fill$]: https://github.com/nodef/extra-array/wiki/fill$
[sort]: https://github.com/nodef/extra-array/wiki/sort
[sort$]: https://github.com/nodef/extra-array/wiki/sort$
[push]: https://github.com/nodef/extra-array/wiki/push
[push$]: https://github.com/nodef/extra-array/wiki/push$
[pop]: https://github.com/nodef/extra-array/wiki/pop
[pop$]: https://github.com/nodef/extra-array/wiki/pop$
[shift]: https://github.com/nodef/extra-array/wiki/shift
[shift$]: https://github.com/nodef/extra-array/wiki/shift$
[unshift]: https://github.com/nodef/extra-array/wiki/unshift
[unshift$]: https://github.com/nodef/extra-array/wiki/unshift$
[copy]: https://github.com/nodef/extra-array/wiki/copy
[copy$]: https://github.com/nodef/extra-array/wiki/copy$
[copyWithin]: https://github.com/nodef/extra-array/wiki/copyWithin
[copyWithin$]: https://github.com/nodef/extra-array/wiki/copyWithin$
[moveWithin]: https://github.com/nodef/extra-array/wiki/moveWithin
[moveWithin$]: https://github.com/nodef/extra-array/wiki/moveWithin$
[splice]: https://github.com/nodef/extra-array/wiki/splice
[splice$]: https://github.com/nodef/extra-array/wiki/splice$
[split]: https://github.com/nodef/extra-array/wiki/split
[splitAt]: https://github.com/nodef/extra-array/wiki/splitAt
[cut]: https://github.com/nodef/extra-array/wiki/cut
[cutRight]: https://github.com/nodef/extra-array/wiki/cutRight
[cutAt]: https://github.com/nodef/extra-array/wiki/cutAt
[cutAtRight]: https://github.com/nodef/extra-array/wiki/cutAtRight
[group]: https://github.com/nodef/extra-array/wiki/group
[partition]: https://github.com/nodef/extra-array/wiki/partition
[partitionAs]: https://github.com/nodef/extra-array/wiki/partitionAs
[chunk]: https://github.com/nodef/extra-array/wiki/chunk
[cycle]: https://github.com/nodef/extra-array/wiki/cycle
[repeat]: https://github.com/nodef/extra-array/wiki/repeat
[reverse]: https://github.com/nodef/extra-array/wiki/reverse
[reverse$]: https://github.com/nodef/extra-array/wiki/reverse$
[rotate]: https://github.com/nodef/extra-array/wiki/rotate
[rotate$]: https://github.com/nodef/extra-array/wiki/rotate$
[intersperse]: https://github.com/nodef/extra-array/wiki/intersperse
[interpolate]: https://github.com/nodef/extra-array/wiki/interpolate
[intermix]: https://github.com/nodef/extra-array/wiki/intermix
[interleave]: https://github.com/nodef/extra-array/wiki/interleave
[concat]: https://github.com/nodef/extra-array/wiki/concat
[concat$]: https://github.com/nodef/extra-array/wiki/concat$
[join]: https://github.com/nodef/extra-array/wiki/join
[isUnique]: https://github.com/nodef/extra-array/wiki/isUnique
[isDisjoint]: https://github.com/nodef/extra-array/wiki/isDisjoint
[unique]: https://github.com/nodef/extra-array/wiki/unique
[union]: https://github.com/nodef/extra-array/wiki/union
[union$]: https://github.com/nodef/extra-array/wiki/union$
[intersection]: https://github.com/nodef/extra-array/wiki/intersection
[difference]: https://github.com/nodef/extra-array/wiki/difference
[symmetricDifference]: https://github.com/nodef/extra-array/wiki/symmetricDifference
[cartesianProduct]: https://github.com/nodef/extra-array/wiki/cartesianProduct
