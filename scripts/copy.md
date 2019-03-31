Copy part of [array] to another array, like [Array.slice()].
> Uses [Array.length] and [Array.copyWithin()] to improve performance.<br>
> Ref: [Array copy loop vs copy within].

```javascript
const copy = require('@extra-array/copy');
// copy(<array>, [begin=0], [end], [target=[]], [at], [till])
// -> <target>

copy(['p', 'o', 'r', 't']);
// ['p', 'o', 'r', 't']
copy(['p', 'o', 'r', 't'], 1);
// ['o', 'r', 't']
copy(['p', 'o', 'r', 't'], 1, 3);
// ['o', 'r']
copy(['p', 'o', 'r', 't'], 1, 3, ['d', 'o']);
// ['d', 'o', 'o', 'r']
copy(['p', 'o', 'r', 't'], 1, 3, ['d', 'o'], 1);
// ['d', 'o', 'r']
```
> With [extra-array] try `Array.copy()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.slice()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
[Array.length]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length
[Array.copyWithin()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin
[Array copy loop vs copy within]: https://jsperf.com/array-copy-loop-vs-copy-within
