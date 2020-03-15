Create [array] from [entries].

```javascript
const fromEntries = require('@extra-array/from-entries');
// fromEntries(<entries>, [map function], [this])

fromEntries([3, 1, 5, 19, 1, 18].entries());
// [3, 1, 5, 19, 1, 18]
fromEntries(['c', 'a', 'e', 's', 'e', 'r'].entries());
// ['c', 'a', 'e', 's', 'a', 'r']
fromEntries([[0, 'g'], [1, 'o']], (v, i, ent) => v==='g'? 'n':v);
// ['n', 'o']
```
> With [extra-array] try `Array.fromEntries()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[entries]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries
