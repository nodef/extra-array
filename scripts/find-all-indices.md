Get indices of all values in [array] that satisfy the test, like [Array.findIndex()].

```javascript
const findAllIndices = require('@extra-array/find-all-indices');
// findAllIndices(<array>, <test function>, [this], [begin=0], [end], [target=[]], [at])
// - <test function>(<value>, <index>, <array>)

findAllIndices(['a', 'b', 'cd'], (v) => v>'b');
// [2]
findAllIndices(['a', 'b', 'c', 'd'], (v, i, arr) => v>'b', null, 1);
// [2, 3]
findAllIndices(['a', 'b', 'c', 'd'], (v, i, arr) => v>'b', null, 1, 3);
// [2]
findAllIndices(['a', 'b', 'c', 'd'], (v, i, arr) => v>'b', null, 1, 3, [10, 11]);
// [10, 11, 2]
findAllIndices(['a', 'b', 'c', 'd'], (v, i, arr) => v>'b', null, 1, 3, [10, 11], 1);
// [10, 2]
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.findIndex()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
