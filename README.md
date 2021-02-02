An [array] is a collection of values, stored contiguously.

Some methods accept a map function for *faster comparision* (like [unique]).
I find the map-approach beautiful, which i learned from Haskell's `sortOn()`.
You can notice that i have followed Javascript naming scheme as far as possible.
Some names are borrowed from Haskell, Python, Java, Processing.

> Stability: Experimental.

<br>

```javascript
const array = require('extra-array');
// import * as array from 'extra-array';
// import * as array from 'https://unpkg.com/extra-array@2.10.15/index.mjs'; (deno)

var x = [1, 2, 3];
array.get(x, -1);
// 3

var x = [1, 2, 3, 4];
array.swap(x, 0, 1);
// [2, 1, 3, 4]

var x = [1, 2, 3, 4];
array.rotate(x, 1);
// [4, 1, 2, 3]

var x = [1, 3, 5, 7];
array.bsearch(x, 5);
// 2           ^ found

[...array.permutations([1, 2, 3])];
// [
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

| Method                | Action
|-----------------------|-------
| [is]                  | Checks if value is array.
| [get]                 | Gets value at index.
| [set]                 | Sets value at index.
| [swap]                | Exchanges two values.
| [index]               | Gets zero-based index.
| [indexRange]          | Gets index range of part of array.
| [size]                | Counts the number of values.
|                       |
| [fill]                | Fills with given value.
| [copy]                | Copies part of array to another.
| [concat]              | Appends values from arrays.
| [slice]               | Gets a part of array.
| [splice]              | Removes or replaces existing values.
| [flat]                | Flattens nested array to given depth.
| [cut]                 | Breaks array when test passes.
| [chunk]               | Breaks array into chunks of given size.
| [cycle]               | Gives values that cycle through array.
| [repeat]              | Repeats an array given times.
| [reverse]             | Reverses the array.
| [rotate]              | Rotates values in array.
| [interleave]          | Merges values from arrays.
|                       |
| [min]                 | Finds smallest value.
| [max]                 | Finds largest entry.
| [range]               | Finds smallest and largest entries.
| [map]                 | Updates values based on map function.
| [filter]              | Keeps values which pass a test.
| [count]               | Counts values which satisfy a test.
| [partition]           | Segregates values by test result.
| [group]               | Breaks array keeping similar values together.
| [split]               | Breaks array considering test as separator.
| [zip]                 | Combines values from arrays.
|                       |
| [unique]              | Removes duplicate values.
| [union]               | Gives values present in any array.
| [intersection]        | Gives values present in both arrays.
| [difference]          | Gives values of array not present in another.
| [isUnique]            | Checks if there are no duplicate values.
| [isDisjoint]          | Checks if arrays have no value in common.
|                       |
| [value]               | Picks an arbitrary value.
| [prefix]              | Picks an arbitrary prefix.
| [infix]               | Picks an arbitrary infix.
| [suffix]              | Picks an arbitrary suffix.
| [subsequence]         | Picks an arbitrary subsequence.
| [permutation]         | Picks an arbitrary permutation.
|                       |
| [isEqual]             | Checks if two arrays are equal.
| [compare]             | Compares two arrays.
| [search]              | Finds index of first value passing a test.
| [bsearch]             | Binary searches leftmost value in sorted array.
| [find]                | Finds first value passing a test.
| [findIndex]           | Finds index of leftmost value passing a test.
| [sort]                | Arranges values in an order.

<br>
<br>

[![](https://img.youtube.com/vi/VYOOiIJeBOA/maxresdefault.jpg)](https://www.youtube.com/watch?v=VYOOiIJeBOA)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[browserify]: https://www.npmjs.com/package/browserify
[rollup]: https://www.npmjs.com/package/rollup
[uglify-js]: https://www.npmjs.com/package/uglify-js
[bsearch]: https://github.com/nodef/extra-array/wiki/bsearch
[chunk]: https://github.com/nodef/extra-array/wiki/chunk
[compare]: https://github.com/nodef/extra-array/wiki/compare
[concat]: https://github.com/nodef/extra-array/wiki/concat
[copy]: https://github.com/nodef/extra-array/wiki/copy
[count]: https://github.com/nodef/extra-array/wiki/count
[cut]: https://github.com/nodef/extra-array/wiki/cut
[cycle]: https://github.com/nodef/extra-array/wiki/cycle
[difference]: https://github.com/nodef/extra-array/wiki/difference
[fill]: https://github.com/nodef/extra-array/wiki/fill
[filter]: https://github.com/nodef/extra-array/wiki/filter
[find]: https://github.com/nodef/extra-array/wiki/find
[findIndex]: https://github.com/nodef/extra-array/wiki/findIndex
[flat]: https://github.com/nodef/extra-array/wiki/flat
[get]: https://github.com/nodef/extra-array/wiki/get
[group]: https://github.com/nodef/extra-array/wiki/group
[index]: https://github.com/nodef/extra-array/wiki/index
[indexRange]: https://github.com/nodef/extra-array/wiki/indexRange
[infix]: https://github.com/nodef/extra-array/wiki/infix
[infixes]: https://github.com/nodef/extra-array/wiki/infixes
[interleave]: https://github.com/nodef/extra-array/wiki/interleave
[intersection]: https://github.com/nodef/extra-array/wiki/intersection
[is]: https://github.com/nodef/extra-array/wiki/is
[isDisjoint]: https://github.com/nodef/extra-array/wiki/isDisjoint
[isEqual]: https://github.com/nodef/extra-array/wiki/isEqual
[isInfix]: https://github.com/nodef/extra-array/wiki/isInfix
[isPermutation]: https://github.com/nodef/extra-array/wiki/isPermutation
[isPrefix]: https://github.com/nodef/extra-array/wiki/isPrefix
[isSubsequence]: https://github.com/nodef/extra-array/wiki/isSubsequence
[isSuffix]: https://github.com/nodef/extra-array/wiki/isSuffix
[isUnique]: https://github.com/nodef/extra-array/wiki/isUnique
[map]: https://github.com/nodef/extra-array/wiki/map
[max]: https://github.com/nodef/extra-array/wiki/max
[min]: https://github.com/nodef/extra-array/wiki/min
[partition]: https://github.com/nodef/extra-array/wiki/partition
[permutation]: https://github.com/nodef/extra-array/wiki/permutation
[permutations]: https://github.com/nodef/extra-array/wiki/permutations
[prefix]: https://github.com/nodef/extra-array/wiki/prefix
[prefixes]: https://github.com/nodef/extra-array/wiki/prefixes
[range]: https://github.com/nodef/extra-array/wiki/range
[repeat]: https://github.com/nodef/extra-array/wiki/repeat
[reverse]: https://github.com/nodef/extra-array/wiki/reverse
[rotate]: https://github.com/nodef/extra-array/wiki/rotate
[search]: https://github.com/nodef/extra-array/wiki/search
[set]: https://github.com/nodef/extra-array/wiki/set
[slice]: https://github.com/nodef/extra-array/wiki/slice
[sort]: https://github.com/nodef/extra-array/wiki/sort
[splice]: https://github.com/nodef/extra-array/wiki/splice
[split]: https://github.com/nodef/extra-array/wiki/split
[subsequence]: https://github.com/nodef/extra-array/wiki/subsequence
[subsequences]: https://github.com/nodef/extra-array/wiki/subsequences
[suffix]: https://github.com/nodef/extra-array/wiki/suffix
[suffixes]: https://github.com/nodef/extra-array/wiki/suffixes
[swap]: https://github.com/nodef/extra-array/wiki/swap
[union]: https://github.com/nodef/extra-array/wiki/union
[unique]: https://github.com/nodef/extra-array/wiki/unique
[unshift]: https://github.com/nodef/extra-array/wiki/unshift
[zip]: https://github.com/nodef/extra-array/wiki/zip
[size]: https://github.com/nodef/extra-array/wiki/size
[value]: https://github.com/nodef/extra-array/wiki/value
[:running:]: https://npm.runkit.com/extra-array
[:package:]: https://www.npmjs.com/package/extra-array
[:moon:]: https://www.npmjs.com/package/extra-array.min
[:ledger:]: https://unpkg.com/extra-array/
[:vhs:]: https://asciinema.org/a/337172
