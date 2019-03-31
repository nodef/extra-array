Get first value in [array] that satisfies the test, like [Array.find()].

```javascript
const find = require('@extra-array/find');
// find(<array>, <test function>, [this], [begin=0], [end])
// - <test function>(<value>, <index>, <array>)

find(['a', 'b', 'cd'], (v) => v>'b');
// 'cd'
find(['a', 'b', 'cd'], (v, i, arr) => v>'b', null, 1);
// 'cd'
find(['a', 'b', 'cd'], (v, i, arr) => v>'b', null, 1, 2);
// undefined
```
> With [extra-array] try `Array.find()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.find()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
