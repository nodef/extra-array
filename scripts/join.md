Join values in [array] into a string, like [Array.join()].

```javascript
const joinTo = require('@extra-array/join');
// joinTo(<array>, [separator=,], [begin=0], [end], [target=''])

joinTo(['a', 'm', 'u', 'l']);
// 'a,m,u,l'
joinTo(['a', 'm', 'u', 'l'], '.');
// 'a.m.u.l'
joinTo(['a', 'm', 'u', 'l'], '.', 1);
// 'm.u.l'
joinTo(['a', 'm', 'u', 'l'], '.', 1, 3);
// 'm.u'
joinTo(['a', 'm', 'u', 'l'], '.', 1, 3, 'C:>');
// 'C:>m.u'
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.join()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
