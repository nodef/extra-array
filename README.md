An array is a collection of values, stored contiguosly.

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
| [is]                   | Checks if value is a set.
| [isEqual]              | Checks if two sets have the same values.
| [isSubset]             | Checks if set is part of all collections.
| [isSuperset]           | Checks if all collections are part of set.
| [isDisjoint]           | Checks if collections have no value in common.
| [union]                | Gives a set with values from all collections.
| [union$]               | Gives a set with values from all collections.
| [intersection]         | Gives a set with values in all collections.
| [intersection$]        | Gives a set with values in all collections.
| [difference]           | Gives a set excluding values in collections.
| [difference$]          | Gives a set excluding values in collections.
| [symmetricDifference]  | Gives a set with values in odd number of collections.
| [powerset]             | Lists all subsets of a set.

[![nodef](https://merferry.glitch.me/card/extra-set.svg)](https://nodef.github.io)

> Browserified, minified version of this package is [extra-set.min].

[is]: https://github.com/nodef/extra-set/wiki/is
[isEqual]: https://github.com/nodef/extra-set/wiki/isEqual
[isSubset]: https://github.com/nodef/extra-set/wiki/isSubset
[isSuperset]: https://github.com/nodef/extra-set/wiki/is
[isDisjoint]: https://github.com/nodef/extra-set/wiki/isDisjoint
[union]: https://github.com/nodef/extra-set/wiki/union
[union$]: https://github.com/nodef/extra-set/wiki/union$
[intersection]: https://github.com/nodef/extra-set/wiki/intersection
[intersection$]: https://github.com/nodef/extra-set/wiki/intersection$
[difference]: https://github.com/nodef/extra-set/wiki/difference
[difference$]: https://github.com/nodef/extra-set/wiki/difference$
[symmetricDifference]: https://github.com/nodef/extra-set/wiki/symmetricDifference
[powerset]: https://github.com/nodef/extra-set/wiki/powerset
[set]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
[extra-set.min]: https://www.npmjs.com/package/extra-set.min
