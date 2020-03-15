Count occurences of value in [array].

```javascript
const count = require('@extra-array/count');
// count(<array>, <value>, [begin=0], [end])
// -> <count of value>

count(['e', 'e', 'r', 'i', 'e'], 'e');
// 3
count(['e', 'e', 'r', 'i', 'e'], 'e', 1);
// 2
count(['e', 'e', 'r', 'i', 'e'], 'e', 1, 4);
// 1
```
> With [extra-array] try `Array.count()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
