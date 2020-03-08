Check if only value is present in [array].

```javascript
const includesOnly = require('@extra-array/includes-only');
// includesOnly(<array>, <value>, [begin=0], [end])
// -> true|false

includesOnly(['a', 'b', 'b', 'c'], 'b');
// false (abbc !== bbbb)
includesOnly(['a', 'b', 'b', 'c'], 'b', 1);
// false (bbc !== bbb)
includesOnly(['a', 'b', 'b', 'c'], 'b', 1, 3);
// true  (bb === bb)
```
> With [extra-array] try `Array.includesOnly()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
