Repeat [array] n times, like [String.repeat()].

```javascript
const repeatTo = require('@extra-array/repeat');
// repeatTo(<array>, [times=1], [begin=0], [end], [target=[]], [at])

repeatTo(['a', 'b'], 3);
// ['a', 'b', 'a', 'b', 'a', 'b']
repeatTo(['a', 'b', 'c', 'd'], 2, 1);
// ['b', 'c', 'd', 'b', 'c', 'd']
repeatTo(['a', 'b', 'c', 'd'], 2, 1, 3);
// ['b', 'c', 'b', 'c']
repeatTo(['a', 'b', 'c', 'd'], 2, 1, 3, ['z', 'y']);
// ['z', 'y', 'b', 'c', 'b', 'c']
repeatTo(['a', 'b', 'c', 'd'], 2, 1, 3, ['z', 'y'], 1);
// ['z', 'b', 'c', 'b', 'c']
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[String.repeat()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
