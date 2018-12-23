Append [iterables] to [array], like [Array.push()].
> To append a single array, use [Array.prototype.push.apply()] instead.

```javascript
const append = require('@extra-array/append');
// append(<array>, <iterable>...)

append([7, 15, 4], new Set([11, 18, 9, 19, 8, 14, 1]));
// [7, 15, 4, 11, 18, 9, 19, 8, 14, 1] (whats this?)
append(['l', 'o', 'r', 'd'], 'jaga', 'nnath');
// ['l', 'o', 'r', 'd', 'j', 'a', 'g', 'a', 'n', 'n', 'a', 't', 'h']
append([], new Map([['j', 10], ['e', 5], ['s', 19]]), new Map([['u', 21], ['s', 19]]));
// [['j', 10], ['e', 5], ['s', 19], ['u', 21], ['s', 19]]
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[iterables]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.push()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
[Array.prototype.push.apply()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
