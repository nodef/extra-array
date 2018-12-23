Check if value is present in [array], like [Array.includes()].

```javascript
const includesIt = require('@extra-array/includes');
// includesIt(<array>, <search value>, [begin=0], [end])

includesIt(['c', 'a', 'l', 'c'], 'c');
// true
includesIt(['c', 'a', 'l', 'c'], 'c', 1);
// true
includesIt(['c', 'a', 'l', 'c'], 'c', 1, 3);
// false
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.includes()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
