Remove falsy values from [array], like [_.compact()].

```javascript
const compactTo = require('@extra-array/compact');
// compactTo(<array>, [begin=0], [end], [target=[]], [at])

var a = ['y', null, 'o', null, 'l', null, 'o'];
compactTo(a);
// ['y', 'o', 'l', 'o']
compactTo(a, 1);
// ['o', 'l', 'o']
compactTo(a, 1, 6);
// ['o', 'l']
compactTo(a, 1, 6, ['f', 'o']);
// ['f', 'o', 'o', 'l']
compactTo(a, 1, 6, ['f', 'o'], 1);
// ['f', 'o', 'l']
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[_.compact()]: http://underscorejs.org/#compact
