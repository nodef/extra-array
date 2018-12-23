Check if [array] is equal to another array.

```javascript
const equalTo = require('@extra-array/equal');
// equalTo(<array 1>, <array 2>, [begin 1=0], [end 1], [begin 2=0], [end 2])

var a = ['l', 'o', 's', 't'];
var b = ['b', 'o', 's', 's']
equalTo(a, b);
// false (lost !== boss)
equalTo(a, b, 1);
// false (ost !== boss)
equalTo(a, b, 1, 3);
// false (os !== boss)
equalTo(a, b, 1, 3, 1);
// false (os !== oss)
equalTo(a, b, 1, 3, 1, 3);
// true (os === os)
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
