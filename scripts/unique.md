Get unique values in [array]. [speed?]

```javascript
const uniqueOf = require('@extra-array/unique');
// uniqueOf(<array>)
// -> [unique values]


uniqueOf([1, 0, 0, 1, 0]);
// [1, 0]

uniqueOf('mississippi');
// ['m', 'i', 's', 'p']
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[speed?]: https://jsperf.com/array-uniqueof
