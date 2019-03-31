Join values in [array] into a string, like [Array.join()].

```javascript
const join = require('@extra-array/join');
// join(<array>, [separator=,], [begin=0], [end], [target=''])

join(['a', 'm', 'u', 'l']);
// 'a,m,u,l'
join(['a', 'm', 'u', 'l'], '.');
// 'a.m.u.l'
join(['a', 'm', 'u', 'l'], '.', 1);
// 'm.u.l'
join(['a', 'm', 'u', 'l'], '.', 1, 3);
// 'm.u'
join(['a', 'm', 'u', 'l'], '.', 1, 3, 'C:>');
// 'C:>m.u'
```
> With [extra-array] try `Array.join()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.join()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
