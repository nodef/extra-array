Get unique values in [array]. [speed?]

```javascript
const unique = require('@extra-array/unique');
// unique(<array>)
// -> [unique values]


unique([1, 0, 0, 1, 0]);
// [1, 0]

unique('mississippi');
// ['m', 'i', 's', 'p']
```
> With [extra-array] try `Array.unique()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[speed?]: https://jsperf.com/array-uniqueof
