Filter values from [array] that pass the test, like [Array.filter()].

```javascript
const filter = require('@extra-array/filter');
// filter(<array>, <test function>, [this], [begin=0], [end], [target=[]], [at])
// - <test function>(<value>, <index>, <array>)

filter(['l', 'i', 'v', 'e'], (v) => v>'e');
// ['l', 'i', 'v']
filter(['l', 'i', 'v', 'e'], (v, i, arr) => v>'e', null, 1);
// ['i', 'v']
filter(['l', 'i', 'v', 'e'], (v, i, arr) => v>'e', null, 1, 3);
// ['i', 'v']
filter(['l', 'i', 'v', 'e'], (v, i, arr) => v>'e', null, 1, 3, ['s', 'h']);
// ['s', 'h', 'i', 'v']
filter(['l', 'i', 'v', 'e'], (v, i, arr) => v>'e', null, 1, 3, ['s', 'h'], 1);
// ['s', 'i', 'v']
```
> With [extra-array] try `Array.filter()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.filter()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
