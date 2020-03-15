An [array] is a collection of values, stored contiguosly.

```javascript
const set = require('extra-set');

var s = new Set([1, 2, 3, 4]);
set.difference(s, [1, 3]);
// Set(2) { 2, 4 }

var t = new Set([2, 3]);
set.isDisjoint(t, [4, 5]);
// true

set.symmetricDifference([1, 2, 3], [2, 3, 4]);
// Set(2) { 1, 4 }
```

### reference

| Method                 | Action
|------------------------|-------
| [is]                   | Checks if value is array.
| [head]                 | Gets first value.
| [tail]                 | Gets values except first.
| [init]                 | Gets values except last.
| [last]                 | Gets last value.
| [get]                  | Gets value at index (+ve, -ve).
| [set]                  | Sets value at index (+ve, -ve).
| [set$]                 | Sets value at index (+ve, -ve).
| [swap]                 | Exchanges two values.
| [swap$]                | Exchanges two values.
| [compare]              | Compares two arrays.
| [isEqual]              | Checks if two arrays are equal.
| [range]                | Returns evenly spaced values within given interval.
| [linspace]             | Returns evenly spaced values within given interval.
|                        | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 
| [is]                   | 

[![nodef](https://merferry.glitch.me/card/extra-array.svg)](https://nodef.github.io)

> Browserified, minified version of this package is [extra-array.min].

[is]: https://github.com/nodef/extra-array/wiki/is
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[extra-array.min]: https://www.npmjs.com/package/extra-array.min
