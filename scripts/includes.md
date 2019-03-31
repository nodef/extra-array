Check if value is present in [array], like [Array.includes()].

```javascript
const includes = require('@extra-array/includes');
// includes(<array>, <search value>, [begin=0], [end])

includes(['c', 'a', 'l', 'c'], 'c');
// true
includes(['c', 'a', 'l', 'c'], 'c', 1);
// true
includes(['c', 'a', 'l', 'c'], 'c', 1, 3);
// false
```
> With [extra-array] try `Array.includes()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.includes()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
