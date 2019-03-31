Check if [array] is equal to another array.

```javascript
const equal = require('@extra-array/equal');
// equal(<array 1>, <array 2>, [begin 1=0], [end 1], [begin 2=0], [end 2])

var a = ['l', 'o', 's', 't'];
var b = ['b', 'o', 's', 's']
equal(a, b);
// false (lost !== boss)
equal(a, b, 1);
// false (ost !== boss)
equal(a, b, 1, 3);
// false (os !== boss)
equal(a, b, 1, 3, 1);
// false (os !== oss)
equal(a, b, 1, 3, 1, 3);
// true (os === os)
```
> With [extra-array] try `Array.equal()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
