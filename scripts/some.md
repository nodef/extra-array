Check if atleast one value in [array] passes the test, like [Array.some()].

```javascript
const some = require('@extra-array/some');
// some(<array>, <test function>, [this], [begin=0], [end])

some(['vajpayee', 'modi', 'rahul'], (v) => v.includes('rahul'));
// true
some([1, 0, 0, 1], (v, i, itr) => !!v, null, 1);
// true
some([1, 0, 0, 1], (v, i, itr) => !!v, null, 1, 3);
// false
```
> With [extra-array] try `Array.some()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.some()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
