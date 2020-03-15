An [array] is a collection of values, stored contiguously.

```javascript
const array = require('extra-array');

var s = new array([1, 2, 3, 4]);
array.difference(s, [1, 3]);
// array(2) { 2, 4 }

var t = new array([2, 3]);
array.isDisjoint(t, [4, 5]);
// true

array.symmetricDifference([1, 2, 3], [2, 3, 4]);
// array(2) { 1, 4 }
```

### reference

| Method                 | Action
|------------------------|-------
| [is]                   | Checks if value is array.
| [head]                 | Gets first value.
| [tail]                 | Gets values except first.
| [init]                 | Gets values except last.
| [last]                 | Gets last value.
| [get]                  | Gets value at index (+ve, -ve).
| [set]                  | Sets value at index (+ve, -ve).
| [set$]                 | Sets value at index (+ve, -ve).
| [swap]                 | Exchanges two values.
| [swap$]                | Exchanges two values.
| [compare]              | Compares two arrays.
| [isEqual]              | Checks if two arrays are equal.
| [range]                | Returns evenly spaced values within given interval.
| [linspace]             | Returns evenly spaced values within given interval.
|                        | 
| [push]                 | Adds values to the end. 
| [pop]                  | Removes last value.
| [shift]                | Removes first value.
| [unshift]              | Adds values to the start.
| [copy]                 | Copies part of array to another.
| [copy$]                | Copies part of array to another.
| [rotate]               | Rotates values in array.
| [rotate$]              | Rotates values in array.
| [slice$]               | Keeps only the selected region.
| [filter$]              | Keeps the values which pass the test.
| [map$]                 | Updates values based on map function.
| [concat$]              | Appends arrays to the end.
| [reverse]              | Reverses the values.
| [chunk]                | Splits array into chunks of given size.
| [zip]                  | Combines values from n arrays, with a function.
|                        | 
| [splice]               | Removes or replaces existing values.
| [insert]               | Inserts a value to an ordered array.
| [insert$]              | Inserts a value to an ordered array.
| [repeat]               | Repeats an array gives times.
|                        | 
| [bsearch]              | Binary searches value in sorted array.
| [bsearchc]             | Binary searches closest value in sorted array.
| [bsearchl]             | Binary searches leftmost value in sorted array.
| [bsearchr]             | Binary searches rightmost value in sorted array.
| [sort]                 | Sorts based on compare function (optional).
|                        | 
| [prefixes]             | Lists all possible prefixes.
| [infixes]              | Lists all possible infixes.
| [suffixes]             | Lists all possible suffixes.
| [subsequences]         | Lists all possible partial sequences.
| [permutations]         | Lists all possible arrangements.
| [isPrefix]             | Checks if array starts with a prefix.
| [isInfix]              | Checks if array contains an infix.
| [isSuffix]             | Checks if array ends with a suffix.
| [isSubsequence]        | Checks if array has a subsequence.
| [isPermutation]        | Checks if array has a permutation.

[![nodef](https://merferry.glitch.me/card/extra-array.svg)](https://nodef.github.io)

> Browserified, minified version of this package is [extra-array.min].

[is]: https://github.com/nodef/extra-array/wiki/is
[head]: https://github.com/nodef/extra-array/wiki/head
[tail]: https://github.com/nodef/extra-array/wiki/tail
[init]: https://github.com/nodef/extra-array/wiki/init
[last]: https://github.com/nodef/extra-array/wiki/last
[get]: https://github.com/nodef/extra-array/wiki/get
[set]: https://github.com/nodef/extra-array/wiki/set
[set$]: https://github.com/nodef/extra-array/wiki/set$
[swap]: https://github.com/nodef/extra-array/wiki/swap
[swap$]: https://github.com/nodef/extra-array/wiki/swap$
[compare]: https://github.com/nodef/extra-array/wiki/compare
[isEqual]: https://github.com/nodef/extra-array/wiki/isEqual
[range]: https://github.com/nodef/extra-array/wiki/range
[linspace]: https://github.com/nodef/extra-array/wiki/linspace
[push]: https://github.com/nodef/extra-array/wiki/push
[pop]: https://github.com/nodef/extra-array/wiki/pop
[shift]: https://github.com/nodef/extra-array/wiki/shift
[unshift]: https://github.com/nodef/extra-array/wiki/unshift
[copy]: https://github.com/nodef/extra-array/wiki/copy
[copy$]: https://github.com/nodef/extra-array/wiki/copy$
[rotate]: https://github.com/nodef/extra-array/wiki/rotate
[rotate$]: https://github.com/nodef/extra-array/wiki/rotate$
[slice$]: https://github.com/nodef/extra-array/wiki/slice$
[filter$]: https://github.com/nodef/extra-array/wiki/filter$
[map$]: https://github.com/nodef/extra-array/wiki/map$
[concat$]: https://github.com/nodef/extra-array/wiki/concat$
[reverse]: https://github.com/nodef/extra-array/wiki/reverse
[chunk]: https://github.com/nodef/extra-array/wiki/chunk
[zip]: https://github.com/nodef/extra-array/wiki/zip
[splice]: https://github.com/nodef/extra-array/wiki/splice
[insert]: https://github.com/nodef/extra-array/wiki/insert
[insert$]: https://github.com/nodef/extra-array/wiki/insert$
[repeat]: https://github.com/nodef/extra-array/wiki/repeat
[bsearch]: https://github.com/nodef/extra-array/wiki/bsearch
[bsearchc]: https://github.com/nodef/extra-array/wiki/bsearchc
[bsearchl]: https://github.com/nodef/extra-array/wiki/bsearchl
[bsearchr]: https://github.com/nodef/extra-array/wiki/bsearchr
[sort]: https://github.com/nodef/extra-array/wiki/sort
[prefixes]: https://github.com/nodef/extra-array/wiki/prefixes
[infixes]: https://github.com/nodef/extra-array/wiki/infixes
[suffixes]: https://github.com/nodef/extra-array/wiki/suffixes
[subsequences]: https://github.com/nodef/extra-array/wiki/subsequences
[permutations]: https://github.com/nodef/extra-array/wiki/permutations
[isPrefix]: https://github.com/nodef/extra-array/wiki/isPrefix
[isInfix]: https://github.com/nodef/extra-array/wiki/isInfix
[isSuffix]: https://github.com/nodef/extra-array/wiki/isSuffix
[isSubsequence]: https://github.com/nodef/extra-array/wiki/isSubsequence
[isPermutation]: https://github.com/nodef/extra-array/wiki/isPermutation
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[extra-array.min]: https://www.npmjs.com/package/extra-array.min
