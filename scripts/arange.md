Return evenly spaced values within a given interval, like [arange()].

```javascript
const arange = require('@extra-array/arange');
// arange(<start>, <stop>, [step=1], [target=[]], [at])
// -> <target>

arange(0, 3);
// [0, 1, 2]
arange(0, -4, -2);
// [0, -2]
arange(0, -4, -2, [10, 11]);
// [10, 11, 0, -2]
arange(0, -4, -2, [10, 11], 1);
// [10, 0, -2]
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[arange()]: https://docs.scipy.org/doc/numpy-1.13.0/reference/generated/numpy.arange.html
