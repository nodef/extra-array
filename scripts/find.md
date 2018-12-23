Get first value in [array] that satisfies the test, like [Array.find()].

```javascript
const findIn = require('@extra-array/find');
// findIn(<array>, <test function>, [this], [begin=0], [end])
// - <test function>(<value>, <index>, <array>)

findIn(['a', 'b', 'cd'], (v) => v>'b');
// 'cd'
findIn(['a', 'b', 'cd'], (v, i, arr) => v>'b', null, 1);
// 'cd'
findIn(['a', 'b', 'cd'], (v, i, arr) => v>'b', null, 1, 2);
// undefined
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.find()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
