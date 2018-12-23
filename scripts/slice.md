Copy part of [array] to another array, like [Array.slice()].

```javascript
const sliceTo = require('@extra-array/slice');
// sliceTo(<array>, [begin=0], [end], [target=[]], [at])
// begin, end, at: negative indexes allowed
// -> <target>

sliceTo(['p', 'o', 'r', 't']);
// ['p', 'o', 'r', 't']
sliceTo(['p', 'o', 'r', 't'], 1);
// ['o', 'r', 't']
sliceTo(['p', 'o', 'r', 't'], 1, 3);
// ['o', 'r']
sliceTo(['p', 'o', 'r', 't'], 1, 3, ['d', 'o']);
// ['d', 'o', 'o', 'r']
sliceTo(['p', 'o', 'r', 't'], 1, 3, ['d', 'o'], 1);
// ['d', 'o', 'r']
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.slice()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
