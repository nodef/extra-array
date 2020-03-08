Merge values of each object property into corresponding array, like [_.zip()].

```javascript
const zipObject = require('@extra-array/zip-object');
// zipObject(<array>, [begin=0], [end], [target={}])

zipObject([{odd: 1, even: 2}, {odd: 3, even: 4}, {odd: 5, even: 6}]);
// {odd: [1, 3, 5], even: [2, 4, 6]}
zipObject([{odd: 1, even: 2}, {odd: 3, even: 4}, {odd: 5, even: 6}], 1);
// {odd: [3, 5], even: [4, 6]}
zipObject([{odd: 1, even: 2}, {odd: 3, even: 4}, {odd: 5, even: 6}], 1, 2);
// {odd: [3], even: [4]}
zipObject([{odd: 1, even: 2}, {odd: 3, even: 4}, {odd: 5, even: 6}], 1, 2, {neither: [1.5]});
// {neither: [1.5], odd: [3], even: [4]}
```
> With [extra-array] try `Array.zipObject()` instead.
<br>


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[extra-array]: https://www.npmjs.com/package/extra-array
[_.zip()]: http://underscorejs.org/#zip
