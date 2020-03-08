Filter [array] with values of specified indexes, like [_.pick()].

```javascript
const pick = require('@extra-array/pick');
// pick(<array>, <indexes>, [begin=0], [end], [target=[]], [at])

pick(['safehouse', 'insurgent stronghold', 'american consumption'], new Set([1, 0]));
// ['insurgent stronghold', 'safehouse']
pick([1, 8, 6, 9], [3, 2], 1);
// [9 ,6]
pick([1, 8, 6, 9], [3, 2], 1, 3);
// [undefined, 6]
pick([1, 8, 6, 9], [3, 2], 1, 3, [10, 11]);
// [10, 11, undefined, 6]
pick([1, 8, 6, 9], [3, 2], 1, 3, [10, 11], 1);
// [10, undefined, 6]
```
> With [extra-array] try `Array.pick()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[_.pick()]: http://underscorejs.org/#pick
