Get value iterator of [array], like [Array.values()].

```javascript
const values = require('@extra-array/values');
// values(<array>, [begin=0], [end])
// -> <iterator>

var a = ['l', 'y', 'o', 'k', 'o'];
values(a);
// Iterator {'l', 'y', 'o', 'k', 'o'}
values(a, 1);
// Iterator {'y', 'o', 'k', 'o'}
values(a, 1, 4);
// Iterator {'y', 'o', 'k'}
```
> With [extra-array] try `Array.values()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.values()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values
