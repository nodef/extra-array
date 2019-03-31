Get index of last value in [sorted] [array].
> Use [binarySearch], if index of value is needed.

```javascript
const binarySearch = require('@extra-array/binary-search.last');
// binarySearch(<array>, <value>, [compare function], [this], [begin=0], [end])
// -> <last index of value> | ~<index of closest value>

binarySearch([21, 42, 91, 91], 91);
// 3
binarySearch([21, 42, 91, 91], 42, null, null, 2);
// -3 (-ve => not found, closest: ~(-3) = 2)
binarySearch([21, 42, 91, 91], 91, null, null, 2, 4);
// 3

binarySearch([21, 42, 91, 91], 91, (a, b) => a===b? 0:(a<b? -1:1));
// 3
binarySearch(['G', 'KG', 'KG', 'MG'], 'g', (a, b, i) => a.toLowerCase().localeCompare(b.toLowerCase()), null, 1);
// -2 (-ve => not found, closest: ~(-2) = 1)
binarySearch(['G', 'KG', 'KG', 'MG'], 'KG', (a, b, i, arr) => a.localeCompare(b), null, 1, 4);
// 2
```
> With [extra-array] try `Array.binarySearch.last()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[sorted]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[binarySearch]: https://www.npmjs.com/package/@extra-array/binary-search
