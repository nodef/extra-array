Get minimum value in [array], like [Math.min()].

```javascript
const minOf = require('@extra-array/min');
// minOf(<array>, [begin=0], [end])

minOf([-19, -47]);
// -47
minOf([17, 20, 47, 19], 1);
// 19
minOf([17, 20, 47, 19], 1, 3);
// 20
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Math.min()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
