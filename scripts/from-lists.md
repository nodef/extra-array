Create [array] from [lists] of keys and values.

```javascript
const fromLists = require('@extra-array/from-lists');
// fromLists(<lists>, [map function], [this])

a = ['care', 'hospital', 'hitech'];
fromLists([a.keys(), a]);
// ['care', 'hospital', 'hitech']
fromLists([[0, 2, 1], a]);
// ['care', 'hitech', 'hospital']
fromLists([[0, 2, 1], a], (v, i, lst) => v.substr(1));
// ['are', 'itech', 'ospital']
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[lists]: https://www.npmjs.com/package/lists-is
