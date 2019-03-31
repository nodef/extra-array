Ensure value is an [array].

```javascript
const ensure = require('@extra-array/ensure');
// ensure(<value>)
// -> <array>

ensure([1, 0, 2]);
// [1, 0, 2]
ensure(1);
// [1]
ensure(undefined);
// []
```
> With [extra-array] try `Array.ensure()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
