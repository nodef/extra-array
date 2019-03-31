Get maximum value in [array], like [Math.max()].

```javascript
const max = require('@extra-array/max');
// max(<array>, [begin=0], [end])

max([-19, -47]);
// -19
max([47, 17, 19, 20], 1);
// 20
max([47, 17, 19, 20], 1, 3);
// 19
```
> With [extra-array] try `Array.max()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Math.max()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
