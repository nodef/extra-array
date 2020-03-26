An [array] is a collection of values, stored contiguously.
This was my attempt at a simpler array manipulation API. Most are immutable methods,
and do not modify the arguments. Any that do *for performance reasons* end in **$**.
Many methods, like `union()` also accept a *compare function*. More performant
versions accept a *map function* instead to avoid *O(n²)* calls, and end with **On**.
I find this map-approach beautiful, which i learned from Haskell's `sortOn()`.

You can notice that i have followed Javascript naming scheme as far as possible.
Some names are borrowed from Haskell, Python, Java, Processing. They are grouped
together by function, in reference below. Did i miss some really useful method?

Each method is also available as separate package for use by bundling tools,
like [browserify], [rollup], [uglify-js].

> Stability: Experimental.

```javascript
const array = require('extra-array');

array.last([1, 2, 3]);
// 3

var a = [1, 2, 3, 4];
array.swap(a, 0, 1);
// [2, 1, 3, 4]

var a = [1, 2, 3, 4];
array.rotate(a, 1);
// [4, 1, 2, 3]

array.bsearch([1, 3, 5, 7], 5);
// 2                 ^ found

[...array.permutations([1, 2, 3])];
// [
//   [ 1, 2, 3 ],
//   [ 2, 1, 3 ],
//   [ 1, 3, 2 ],
//   [ 3, 1, 2 ],
//   [ 2, 3, 1 ],
//   [ 3, 2, 1 ]
// ]
```

### reference

| Method                | Action
|-----------------------|-------
| [is]                  | Checks if value is array.
| [get]                 | Gets value at index (+ve, -ve).
| [set]                 | Sets value at index (+ve, -ve).
| [swap]                | Exchanges two values.
|                       | 
| [fill]                | Fills with given value.
| [copy]                | Copies part of array to another.
| [slice]               | Gets a part of array.
| [concat]              | Appends arrays to the end.
| [splice]              | Removes or replaces existing values.
| [flat]                | Flattens nested array to given depth.
| [chunk]               | Breaks array into chunks of given size.
| [cycle]               | Gives values that cycle through an array.
| [repeat]              | Repeats an array given times.
| [reverse]             | Reverses the values.
| [rotate]              | Rotates values in array.
| [interleave]          | Places values of an array between another.
| [cut]                 | Breaks array at/after given indices.
|                       | 
| [min]                 | Finds smallest value.
| [max]                 | Finds largest value.
| [range]               | Finds smallest and largest values.
| [map]                 | Updates values based on map function.
| [filter]              | Keeps the values which pass the test.
| [count]               | Counts occurrences of value(s).
| [partition]           | Breaks array into values, by test.
| [group]               | Keeps similar values together and in order.
| [split]               | Breaks array considering test as separator.
| [zip]                 | Combines values from n arrays, with a function.
|                       | 
| [unique]              | Removes duplicate elements.
| [union]               | Gives values present in any array.
| [intersection]        | Gives values present in both arrays.
| [difference]          | Gives values of an array not present in another.
| [isUnique]            | Checks if there are no duplicate values.
| [isDisjoint]          | Checks if arrays have no value in common.
|                       | 
| [prefix]              | Picks an arbitrary prefix.
| [infix]               | Picks an arbitrary infix.
| [suffix]              | Picks an arbitrary suffix.
| [subsequence]         | Picks an arbitrary subsequence.
| [permutation]         | Picks an arbitrary permutation.
| [prefixes]            | Lists all possible prefixes.
| [infixes]             | Lists all possible infixes.
| [suffixes]            | Lists all possible suffixes.
| [subsequences]        | Lists all possible subsequences.
| [permutations]        | Lists all possible arrangements.
| [isPrefix]            | Checks if array starts with a prefix.
| [isInfix]             | Checks if array contains an infix.
| [isSuffix]            | Checks if array ends with a suffix.
| [isSubsequence]       | Checks if array has a subsequence.
| [isPermutation]       | Checks if array has a permutation.
|                       | 
| [isEqual]             | Checks if two arrays are equal.
| [compare]             | Compares two arrays.
| [search]              | Searches a value from left.
| [bsearch]             | Binary searches value in sorted array.
| [find]                | Finds index of left/rightmost value passing the test.
| [findIndex]           | Finds index(es) of values passing the test.
| [sort]                | Arranges values in an order.

<br>

[![nodef](https://merferry.glitch.me/card/extra-array.svg)](https://nodef.github.io)

> Browserified, minified version of this package is [extra-array.min].

[bsearch]: https://github.com/nodef/extra-array/wiki/bsearch
[chunk]: https://github.com/nodef/extra-array/wiki/chunk
[compare]: https://github.com/nodef/extra-array/wiki/compare
[concat]: https://github.com/nodef/extra-array/wiki/concat
[copy]: https://github.com/nodef/extra-array/wiki/copy
[copyWithin]: https://github.com/nodef/extra-array/wiki/copyWithin
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
[head]: https://github.com/nodef/extra-array/wiki/head
[infix]: https://github.com/nodef/extra-array/wiki/infix
[infixes]: https://github.com/nodef/extra-array/wiki/infixes
[init]: https://github.com/nodef/extra-array/wiki/init
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
[last]: https://github.com/nodef/extra-array/wiki/last
[map]: https://github.com/nodef/extra-array/wiki/map
[max]: https://github.com/nodef/extra-array/wiki/max
[min]: https://github.com/nodef/extra-array/wiki/min
[partition]: https://github.com/nodef/extra-array/wiki/partition
[permutation]: https://github.com/nodef/extra-array/wiki/permutation
[permutations]: https://github.com/nodef/extra-array/wiki/permutations
[pop]: https://github.com/nodef/extra-array/wiki/pop
[prefix]: https://github.com/nodef/extra-array/wiki/prefix
[prefixes]: https://github.com/nodef/extra-array/wiki/prefixes
[push]: https://github.com/nodef/extra-array/wiki/push
[range]: https://github.com/nodef/extra-array/wiki/range
[repeat]: https://github.com/nodef/extra-array/wiki/repeat
[reverse]: https://github.com/nodef/extra-array/wiki/reverse
[rotate]: https://github.com/nodef/extra-array/wiki/rotate
[search]: https://github.com/nodef/extra-array/wiki/search
[set]: https://github.com/nodef/extra-array/wiki/set
[shift]: https://github.com/nodef/extra-array/wiki/shift
[slice]: https://github.com/nodef/extra-array/wiki/slice
[sort]: https://github.com/nodef/extra-array/wiki/sort
[splice]: https://github.com/nodef/extra-array/wiki/splice
[split]: https://github.com/nodef/extra-array/wiki/split
[subsequence]: https://github.com/nodef/extra-array/wiki/subsequence
[subsequences]: https://github.com/nodef/extra-array/wiki/subsequences
[suffix]: https://github.com/nodef/extra-array/wiki/suffix
[suffixes]: https://github.com/nodef/extra-array/wiki/suffixes
[swap]: https://github.com/nodef/extra-array/wiki/swap
[tail]: https://github.com/nodef/extra-array/wiki/tail
[union]: https://github.com/nodef/extra-array/wiki/union
[unique]: https://github.com/nodef/extra-array/wiki/unique
[unshift]: https://github.com/nodef/extra-array/wiki/unshift
[zip]: https://github.com/nodef/extra-array/wiki/zip

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[browserify]: https://www.npmjs.com/package/browserify
[rollup]: https://www.npmjs.com/package/rollup
[uglify-js]: https://www.npmjs.com/package/uglify-js
[extra-array.min]: https://www.npmjs.com/package/extra-array.min
