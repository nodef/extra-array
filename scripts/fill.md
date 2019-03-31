Set array elements to a value.

```javascript
const fill = require('@extra-array/fill');
// fill(<array>, <value>, [start=0], [stop=array.length], [step=1])

fill([0, 0], 10);
// [10, 10]
fill(new Array(32), 0);
// [0, 0, ...] (32 zeros)
fill(fill(new Array(4), 0, 0, 4, 2), 1, 1, 4, 2);
// [0, 1, 0, 1]
```
> With [extra-array] try `Array.fill()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
