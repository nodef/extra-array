Get index of value in [sorted] [array].
> Use [@extra-array/binary-search.closest], if index of closest value is needed.<br>
> Use [array-binarysearch.first], if index of first value is needed.<br>
> Use [array-binarysearch.last], if index of last value is needed.

```javascript
const binarySearch = require('array-binarysearch');
// binarySearch(<array>, <value>, [compare function], [this], [begin=0], [end])
// -> <index of value> | ~<index of closest value>

binarySearch([21, 42, 91, 91], 42);
// 1
binarySearch([21, 42, 91, 91], 42, null, null, 2);
// -3 (-ve => not found, closest: ~(-3) = 2)
binarySearch([21, 42, 91, 91], 91, null, null, 2, 4);
// 3

binarySearch([21, 42, 91, 91], 42, (a, b) => a===b? 0:(a<b? -1:1));
// 1
binarySearch(['G', 'KG', 'KG', 'MG'], 'g', (a, b, i) => a.toLowerCase().localeCompare(b.toLowerCase()), null, 1);
// -2 (-ve => not found, closest: ~(-2) = 1)
binarySearch(['G', 'KG', 'KG', 'MG'], 'KG', (a, b, i, arr) => a.localeCompare(b), null, 1, 4);
// 2
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)
References:
- [array-binsearch](https://www.npmjs.com/package/array-binsearch)
- [binarysearch](https://www.npmjs.com/package/binarysearch)


[sorted]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[array-binarysearch.closest]: https://www.npmjs.com/package/array-binarysearch.closest
[array-binarysearch.first]: https://www.npmjs.com/package/array-binarysearch.first
[array-binarysearch.last]: https://www.npmjs.com/package/array-binarysearch.last
