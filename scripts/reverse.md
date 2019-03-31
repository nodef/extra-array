Reverse [array] to another array, like [Array.reverse()].

```javascript
const reverse = require('@extra-array/reverse');
// reverse(<array>, [begin=0], [end], [target=[]], [at])

reverse(['b', 'e', 'a', 'n']);
// ['n', 'a', 'e', 'b']
reverse(['b', 'e', 'a', 'n'], 1);
// ['n', 'a', 'e']
reverse(['b', 'e', 'a', 'n'], 1, 3);
// ['a', 'e']
reverse(['b', 'e', 'a', 'n'], 1, 3, ['z', 'y']);
// ['z', 'y', 'a', 'e']
reverse(['b', 'e', 'a', 'n'], 1, 3, ['z', 'y'], 1);
// ['z', 'a', 'e']
```
> With [extra-array] try `Array.reverse()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.reverse()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
