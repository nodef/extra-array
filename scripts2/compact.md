Remove falsy values from [array], like [_.compact()].

```javascript
const compact = require('@extra-array/compact');
// compact(<array>, [begin=0], [end], [target=[]], [at])

var a = ['y', null, 'o', null, 'l', null, 'o'];
compact(a);
// ['y', 'o', 'l', 'o']
compact(a, 1);
// ['o', 'l', 'o']
compact(a, 1, 6);
// ['o', 'l']
compact(a, 1, 6, ['f', 'o']);
// ['f', 'o', 'o', 'l']
compact(a, 1, 6, ['f', 'o'], 1);
// ['f', 'o', 'l']
```
> With [extra-array] try `Array.compact()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[_.compact()]: http://underscorejs.org/#compact
