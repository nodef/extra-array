Get sorted values of [array] *(using insertion sort)*.

```javascript
const sort = require('@extra-array/sort');
// sort(<array>, [compare function], [this], [begin=0], [end], [target=[]], [at])
// -> <target>

sort([6, 1, 9, 20, 8]);
// [1, 6, 8, 9, 20]
sort(['N', 'o', 'a', 'h'], (a, b) => a.localeCompare(b));
// ['a', 'h', 'N', 'o']
sort(['B', 'i', 'r', 'd', 'm', 'a', 'n'], (a, b) => a.localeCompare(b), null);
// ['a', 'B', 'd', 'i', 'm', 'n', 'r']
sort(['E', 'd', 'g', 'e'], null, null, 1);
// ['d', 'e', 'g']
sort(['E', 'd', 'g', 'e'], null, null, 1, 3);
// ['d', 'g']
sort(['E', 'd', 'g', 'e'], null, null, 1, 3, ['f', 'a']);
// ['f', 'a', 'd', 'g']
sort(['E', 'd', 'g', 'e'], null, null, 1, 3, ['f', 'a'], 1);
// ['f', 'd', 'g']
```
> With [extra-array] try `Array.sort()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
