Get index of first value in [array] that satisfies the test, like [Array.findIndex()].

```javascript
const findIndexOf = require('@extra-array/find-index');
// findIndexOf(<array>, <test function>, [this], [begin=0], [end])
// - <test function>(<value>, <index>, <array>)

findIndexOf(['A', 'B'], (v) => v>'A');
// 1
findIndexOf('abc', (v, i, arr) => v>'b', null, 1);
// 2
findIndexOf('abc', (v, i, arr) => v>'b', null, 1, 2);
// -1
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.findIndex()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
