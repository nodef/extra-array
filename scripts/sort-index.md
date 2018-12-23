Get sorted indexes of [array] *(using insertion sort)*.

```javascript
const sortIndex = require('@extra-array/sort-index');
// sortIndex(<array>, [compare function], [this], [begin=0], [end], [target=[]], [at])
// -> <target>

sortIndex([6, 1, 9, 20, 8]);
// [1, 0, 4, 2, 3]
sortIndex(['N', 'o', 'a', 'h'], (a, b) => a.localeCompare(b));
// [2, 3, 0, 1]
sortIndex(['B', 'i', 'r', 'd', 'm', 'a', 'n'], (a, b) => a.localeCompare(b), null);
// [5, 0, 3, 1, 4, 6, 2]
sortIndex(['E', 'd', 'g', 'e'], null, null, 1);
// [1, 3, 2]
sortIndex(['E', 'd', 'g', 'e'], null, null, 1, 3);
// [1, 2]
sortIndex(['E', 'd', 'g', 'e'], null, null, 1, 3, [10, 11]);
// [10, 11, 1, 2]
sortIndex(['E', 'd', 'g', 'e'], null, null, 1, 3, [10, 11], 1);
// [10, 1, 2]
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
