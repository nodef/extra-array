Get first index of value in [array], like [Array.indexOf()].

```javascript
const indexFor = require('@extra-array/index-of');
// indexFor(<array>, <search value>, [begin=0], [end])

indexFor(['b', 'u', 'n', 'u'], 'u');
// 1
indexFor(['b', 'u', 'n', 'u'], 'u', 2);
// 3
indexFor(['b', 'u', 'n', 'u'], 'u', 2, 3);
// -1
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.indexOf()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
