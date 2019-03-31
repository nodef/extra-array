Reduce [array] to a single value, like [Array.reduce()].

```javascript
const reduce = require('@extra-array/reduce');
// reduce(<array>, <reduce function>, [initial value], [begin=0], [end])
// - <reduce function>(<accumulator>, <value>, <index>, <array>)

reduce(['a', 'b'], (acc, v) => acc+v);
// 'ab'
reduce(['a', 'b', 'c', 'd'], (acc, v, i, arr) => acc+v, 'z');
// 'zabcd'
reduce(['a', 'b', 'c', 'd'], (acc, v, i, arr) => acc+v, 'z', 1);
// 'zbcd'
reduce(['a', 'b', 'c', 'd'], (acc, v, i, arr) => acc+v, 'z', 1, 3);
// 'zbc'
```
> With [extra-array] try `Array.reduce()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.reduce()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
