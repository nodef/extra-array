Check if an [array] contains another array.

```javascript
const containsIt = require('@extra-array/contains');
// containsIt(<array1>, <array2>, [begin1=0], [end1], [begin2=0], [end2])

var a = ['b', 'l', 'i', 's', 's'];
var b = ['f', 'i', 's', 'h'];
containsIt(a, b);
// false (bliss ![c] fish)
containsIt(a, b, 1);
// false (liss ![c] fish)
containsIt(a, b, 1, 4);
// false (lis ![c] fish)
containsIt(a, b, 1, 4, 1);
// false (lis ![c] ish)
containsIt(a, b, 1, 4, 1, 3);
// true (lis [c] is)
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
