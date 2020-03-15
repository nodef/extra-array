Move part of [array] to another array.

```javascript
const move = require('@extra-array/move');
// move(<array>, [clear=0], [begin=0], [end], [target=[]], [at], [till])
// -> <target>

move(['p', 'o', 'r', 't']);
// ['p', 'o', 'r', 't'] (array: [0, 0, 0, 0])
move(['p', 'o', 'r', 't'], null);
// ['p', 'o', 'r', 't'] (array: [null, null, null, null])
move(['p', 'o', 'r', 't'], null, 1);
// ['o', 'r', 't']      (array: ['p', null, null, null])
move(['p', 'o', 'r', 't'], null, 1, 3);
// ['o', 'r']           (array: ['p', null, null, 't'])
move(['p', 'o', 'r', 't'], null, 1, 3, ['d', 'o']);
// ['d', 'o', 'o', 'r'] (array: ['p', null, null, 't'])
move(['p', 'o', 'r', 't'], null, 1, 3, ['d', 'o'], 1);
// ['d', 'o', 'r']      (array: ['p', null, null, 't'])
```
> With [extra-array] try `Array.move()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
