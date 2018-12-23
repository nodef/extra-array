Get sorted values of [array] *(using insertion sort)*.

```javascript
const sortTo = require('@extra-array/sort');
// sortTo(<array>, [compare function], [this], [begin=0], [end], [target=[]], [at])
// -> <target>

sortTo([6, 1, 9, 20, 8]);
// [1, 6, 8, 9, 20]
sortTo(['N', 'o', 'a', 'h'], (a, b) => a.localeCompare(b));
// ['a', 'h', 'N', 'o']
sortTo(['B', 'i', 'r', 'd', 'm', 'a', 'n'], (a, b) => a.localeCompare(b), null);
// ['a', 'B', 'd', 'i', 'm', 'n', 'r']
sortTo(['E', 'd', 'g', 'e'], null, null, 1);
// ['d', 'e', 'g']
sortTo(['E', 'd', 'g', 'e'], null, null, 1, 3);
// ['d', 'g']
sortTo(['E', 'd', 'g', 'e'], null, null, 1, 3, ['f', 'a']);
// ['f', 'a', 'd', 'g']
sortTo(['E', 'd', 'g', 'e'], null, null, 1, 3, ['f', 'a'], 1);
// ['f', 'd', 'g']
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
