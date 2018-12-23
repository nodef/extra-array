Get all values in [array] that satisfy the test, like [Array.find()].

```javascript
const findAll = require('@extra-array/find-all');
// findAll(<array>, <test function>, [this], [begin=0], [end], [target=[]], [at])
// - <test function>(<value>, <index>, <array>)

findAll(['a', 'b', 'cd'], (v) => v>'b');
// ['cd']
findAll(['a', 'b', 'c', 'd'], (v, i, arr) => v>'b', null, 1);
// ['c', 'd']
findAll(['a', 'b', 'c', 'd'], (v, i, arr) => v>'b', null, 1, 3);
// ['c']
findAll(['a', 'b', 'c', 'd'], (v, i, arr) => v>'b', null, 1, 3, ['z', 'y']);
// ['z', 'y', 'c']
findAll(['a', 'b', 'c', 'd'], (v, i, arr) => v>'b', null, 1, 3, ['z', 'y'], 1);
// ['z', 'c']
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.find()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
