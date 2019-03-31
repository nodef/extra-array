Check if all values in [array] pass the test, like [Array.every()].

```javascript
const every = require('@extra-array/every');
// every(<array>, <test function>, [this], [begin=0], [end])
// - <test function>(<value>, <index>, <array>)

every(['d', 's', 'e', 'g'], (v) => v>'d');
// false
every(['d', 's', 'e', 'g'], (v, i, arr) => v>'d', null, 1);
// true
every(['d', 's', 'e', 'g'], (v, i, arr) => v>'d', null, 1, 3);
// true
```
> With [extra-array] try `Array.every()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.every()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
