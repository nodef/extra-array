Get first index of value in [array], like [Array.indexOf()].

```javascript
const indexOf = require('@extra-array/index-of');
// indexOf(<array>, <search value>, [begin=0], [end])

indexOf(['b', 'u', 'n', 'u'], 'u');
// 1
indexOf(['b', 'u', 'n', 'u'], 'u', 2);
// 3
indexOf(['b', 'u', 'n', 'u'], 'u', 2, 3);
// -1
```
> With [extra-array] try `Array.indexOf()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.indexOf()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
