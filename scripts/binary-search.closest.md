Get index of closest value in [sorted] [array].
> Use [binarySearch], if index of value is needed.

```javascript
const binarySearch = require('@extra-array/binary-search.closest');
// binarySearch(<array>, <value>, [compare function], [this], [begin=0], [end])
// -> <index of closest value>

binarySearch([21, 42, 91, 91], 40);
// 1
binarySearch([21, 42, 91, 91], 42, null, null, 2);
// 2
binarySearch([21, 42, 91, 91], 92, null, null, 2, 4);
// 4

binarySearch([21, 42, 91, 91], 40, (a, b) => a===b? 0:(a<b? -1:1));
// 1
binarySearch(['G', 'KG', 'KG', 'MG'], 'g', (a, b, i) => a.toLowerCase().localeCompare(b.toLowerCase()), null, 1);
// 1
binarySearch(['G', 'KG', 'KG', 'MG'], 'KG', (a, b, i, arr) => a.localeCompare(b), null, 1, 4);
// 2
```
> With [extra-array] try `Array.binarySearch.closest()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[sorted]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[binarySearch]: https://www.npmjs.com/package/@extra-array/binary-search
