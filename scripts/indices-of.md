Get indices of all values in [array] equal to specified value, like [Array.indexOf()].

```javascript
const indicesOf = require('@extra-array/indices-of');
// indicesOf(<array>, <search value>, [begin=0], [end], [target=[]], [at])

indicesOf(['r', 'o', 'b', 'o'], 'o');
// [1, 3]
indicesOf(['r', 'o', 'b', 'o'], 'o', 1);
// [1, 3]
indicesOf(['r', 'o', 'b', 'o'], 'o', 1, 3);
// [1]
indicesOf(['r', 'o', 'b', 'o'], 'o', 1, 3, [10, 11]);
// [10, 11, 1]
indicesOf(['r', 'o', 'b', 'o'], 'o', 1, 3, [10, 11], 1);
// [10, 1]
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.indexOf()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
