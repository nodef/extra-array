Reduce [array] to a single value, like [Array.reduce()].

```javascript
const reduceBy = require('@extra-array/reduce');
// reduceBy(<array>, <reduce function>, [initial value], [begin=0], [end])
// - <reduce function>(<accumulator>, <value>, <index>, <array>)

reduceBy(['a', 'b'], (acc, v) => acc+v);
// 'ab'
reduceBy(['a', 'b', 'c', 'd'], (acc, v, i, arr) => acc+v, 'z');
// 'zabcd'
reduceBy(['a', 'b', 'c', 'd'], (acc, v, i, arr) => acc+v, 'z', 1);
// 'zbcd'
reduceBy(['a', 'b', 'c', 'd'], (acc, v, i, arr) => acc+v, 'z', 1, 3);
// 'zbc'
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.reduce()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
