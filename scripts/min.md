Get minimum value in [array], like [Math.min()].

```javascript
const min = require('@extra-array/min');
// min(<array>, [begin=0], [end])

min([-19, -47]);
// -47
min([17, 20, 47, 19], 1);
// 19
min([17, 20, 47, 19], 1, 3);
// 20
```
> With [extra-array] try `Array.min()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Math.min()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
