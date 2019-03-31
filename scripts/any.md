Check if [array] has any truthy values, like [any()].

```javascript
const any = require('@extra-array/any');
// any(<array>, [begin=0], [end])

any([1, 0, 0, '']);
// true
any([1, 0, 0, ''], 1);
// false
any([1, 0, 0, '', 'a'], 1, 4);
// false
```
> With [extra-array] try `Array.any()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[any()]: https://docs.python.org/3/library/functions.html#any
