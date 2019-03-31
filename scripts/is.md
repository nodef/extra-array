Check if value is [array], like [Array.isArray()].

```javascript
const is = require('@extra-array/is');
// is(<value>)

is([5, 12, 14, 9, 14, 15]);
// true
is(['e', 'l', 'n', 'i', 'n', 'o']);
// true
is(new Set([5, 12, 14, 9, 14, 15]));
// false
is({array: true});
// false
```
> With [extra-array] try `Array.is()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.isArray()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
