Filter [array] with values of specified index(es), like [_.pick()].

```javascript
const pickAs = require('@extra-array/pick-as');
// pickAs(<array>, [index(es)], [begin=0], [end], [target=[]], [at])

var a = ['Nefarious', 'Planetary', 'Meddling'];
pickAs(a);
// ['Nefarious', 'Planetary', 'Meddling']
pickAs(a, 2);
// 'Meddling'
pickAs(a, [2, 1, 0]);
// ['Meddling', 'Planetary', 'Nefarious']
pickAs(a, [2, 1, 0], 1);
// ['Meddling', 'Planetary', undefined]
pickAs(a, [2, 1, 0], 1, 2);
// [undefined, 'Planetary', undefined]
pickAs(a, [2, 1, 0], 1, 2, ['z', 'y']);
// ['z', 'y', undefined, 'Planetary', undefined]
pickAs(a, [2, 1, 0], 1, 2, ['z', 'y'], 1);
// ['z', undefined, 'Planetary', undefined]
```
> With [extra-array] try `Array.pickAs()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[_.pick()]: http://underscorejs.org/#pick
