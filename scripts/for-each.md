Call a function for each value in [array], like [Array.forEach()].

```javascript
const forEachOf = require('@extra-array/for-each');
// forEachOf(<array>, <called function>, [this], [begin=0], [end])
// - <called function>(<value>, <index>, <array>)

forEachOf([['rohan', 'lotr'], ['arkham', 'batman']], (v) => {
  var typ = v[1]==='batman'? 'comic':'novel';
  console.log(v[0], v[1], typ);
});
// rohan lotr novel
// arkham batman comic
forEachOf([1, 2, 3, 4], (v) => console.log(v), null, 1);
// 2
// 3
// 4
forEachOf([1, 2, 3, 4], (v) => console.log(v), null, 1, 3);
// 2
// 3
```


[![extra-array](https://i.imgur.com/nwyrmkW.jpg)](https://www.npmjs.com/package/extra-array)

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
[Array.forEach()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
