Get last index of value in [array], like [Array.lastIndexOf()].

```javascript
const lastIndexOf = require('@extra-array/last-index-of');
// lastIndexOf(<array>, <search value>, [begin], [end=-1])

lastIndexOf(['m', 'o', 'n', 'o'], 'o');
// 3
lastIndexOf(['m', 'o', 'n', 'o'], 'o', 2);
// 1
lastIndexOf(['m', 'o', 'n', 'o'], 'o', 2, 1);
// -1
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.lastIndexOf()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
