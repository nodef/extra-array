Set array elements to a value.

```javascript
const set = require('@extra-array/set');
// set(<array>, <value>, [start=0], [stop=array.length], [step=1])

set([0, 0], 10);
// [10, 10]
set(new Array(32), 0);
// [0, 0, ...] (32 zeros)
set(set(new Array(4), 0, 0, 4, 2), 1, 1, 4, 2);
// [0, 1, 0, 1]
```
