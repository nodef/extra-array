Get index of first value in [sorted] [array].
> Use [array-binarysearch], if index of value is needed.

```javascript
const binarySearch = require('@extra-array/binary-search.first');
// binarySearch(<array>, <value>, [compare function], [this], [begin=0], [end])
// -> <first index of value> | ~<index of closest value>

binarySearch([21, 42, 91, 91], 91);
// 2
binarySearch([21, 42, 91, 91], 42, null, null, 2);
// -3 (-ve => not found, closest: ~(-3) = 2)
binarySearch([21, 42, 91, 91], 91, null, null, 2, 4);
// 2

binarySearch([21, 42, 42, 91], 42, (a, b) => a===b? 0:(a<b? -1:1));
// 1
binarySearch(['G', 'KG', 'KG', 'MG'], 'g', (a, b, i) => a.toLowerCase().localeCompare(b.toLowerCase()), null, 1);
// -2 (-ve => not found, closest: ~(-2) = 1)
binarySearch(['G', 'KG', 'KG', 'MG'], 'KG', (a, b, i, arr) => a.localeCompare(b), null, 1, 4);
// 1
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[sorted]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[array-binarysearch]: https://www.npmjs.com/package/array-binarysearch
