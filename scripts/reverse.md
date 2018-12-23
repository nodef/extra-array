Reverse [array] to another array, like [Array.reverse()].

```javascript
const reverseTo = require('@extra-array/reverse');
// reverseTo(<array>, [begin=0], [end], [target=[]], [at])

reverseTo(['b', 'e', 'a', 'n']);
// ['n', 'a', 'e', 'b']
reverseTo(['b', 'e', 'a', 'n'], 1);
// ['n', 'a', 'e']
reverseTo(['b', 'e', 'a', 'n'], 1, 3);
// ['a', 'e']
reverseTo(['b', 'e', 'a', 'n'], 1, 3, ['z', 'y']);
// ['z', 'y', 'a', 'e']
reverseTo(['b', 'e', 'a', 'n'], 1, 3, ['z', 'y'], 1);
// ['z', 'a', 'e']
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.reverse()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
