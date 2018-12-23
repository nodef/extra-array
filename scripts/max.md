Get maximum value in [array], like [Math.max()].

```javascript
const maxOf = require('@extra-array/max');
// maxOf(<array>, [begin=0], [end])

maxOf([-19, -47]);
// -19
maxOf([47, 17, 19, 20], 1);
// 20
maxOf([47, 17, 19, 20], 1, 3);
// 19
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Math.max()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
