Check if all values in [array] are truthy, like [all()].

```javascript
const allOf = require('@extra-array/all');
// allOf(<array>, [begin=0], [end])

allOf([0, -1, 4, 4]);
// false
allOf([0, -1, 4, 4], 1);
// true
allOf([0, -1, 4, 4, ''], 1, 4);
// true
```

[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[all()]: https://docs.python.org/3/library/functions.html#all
