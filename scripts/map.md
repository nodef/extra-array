Map values in [array] to new values, like [Array.map()].

```javascript
const map = require('@extra-array/map');
// map(<array>, <map function>, [this], [begin=0], [end], [target=[]], [at])
// - <map function>(<value>, <index>, <array>)

map(['teenage', 'mutant'], (v) => v.length);
// [7, 6]
map([1, 2, 3, 4], (v, i, itr) => v*v, null, 1);
// [4, 9, 16]
map([1, 2, 3, 4], (v, i, itr) => v*v, null, 1, 3);
// [4, 9]
map([1, 2, 3, 4], (v, i, itr) => v*v, null, 1, 3, [10, 11]);
// [10, 11, 4, 9]
map([1, 2, 3, 4], (v, i, itr) => v*v, null, 1, 3, [10, 11], 1);
// [10, 4, 9]
```
> With [extra-array] try `Array.map()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.map()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
