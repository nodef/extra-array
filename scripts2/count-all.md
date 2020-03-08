Count occurences of all values in [array].

```javascript
const countAll = require('@extra-array/count-all');
// countAll(<array>, [begin=0], [end], [target=new Map()])
// -> <target>

countAll(['e', 'e', 'r', 'i', 'e']);
// Map {'e' => 3, 'r' => 1, 'i' => 1}
countAll(['e', 'e', 'r', 'i', 'e'], 1);
// Map {'e' => 2, 'r' => 1, 'i' => 1}
countAll(['e', 'e', 'r', 'i', 'e'], 1, 4);
// Map {'e' => 1, 'r' => 1, 'i' => 1}
```
> With [extra-array] try `Array.countAll()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections%60
