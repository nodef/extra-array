Get `n` evenly spaced numbers over an interval, like [linspace()].

```javascript
var linspace = require('@extra-array/linspace');
// linspace(<start>, <stop>, [length=100])

linspace(0, 1, 3);
// [0, 0.5, 1]
linspace(0, -1, 5);
// [0, -0.25, -0.5, -0.75, -1]
linspace(0, 1);
// [0, ..., 1]  (100 values)
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[linspace()]: https://in.mathworks.com/help/matlab/ref/linspace.html
