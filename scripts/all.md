Check if all values in [array] are truthy, like [all()].

```javascript
const all = require('@extra-array/all');
// all(<array>, [begin=0], [end])

all([0, -1, 4, 4]);
// false
all([0, -1, 4, 4], 1);
// true
all([0, -1, 4, 4, ''], 1, 4);
// true
```
> With [extra-array] try `Array.all()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[all()]: https://docs.python.org/3/library/functions.html#all
