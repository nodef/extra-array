Get [Hamming distance] between [arrays].

```javascript
const hammingDistance = require('@extra-array/hamming-distance');
// hammingDistance(<array1>, <array2>, [begin0=0], [end0], [begin1=0], [end1])

hammingDistance([0, 1, 0], [1, 1, 1]);
// 2
hammingDistance([2, 1, 7, 3, 8, 9, 6], [2, 2, 3, 3, 7, 9, 6]);
// 3
hammingDistance(['richard', 'hamming'], ['richard']);
// NaN (array lengths are not equal)
```
> With [extra-array] try `Array.hammigDistance()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[Hamming distance]: https://en.wikipedia.org/wiki/Hamming_distance
[arrays]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
