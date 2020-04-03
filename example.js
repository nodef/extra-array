const array = require('extra-array');

array.get([1, 2, 3], -1);;
// 3

var a = [1, 2, 3, 4];
array.swap(a, 0, 1);;
// [2, 1, 3, 4]

var a = [1, 2, 3, 4];
array.rotate(a, 1);;
// [4, 1, 2, 3]

array.bsearch([1, 3, 5, 7], 5);;
// 2                 ^ found

[...array.permutations([1, 2, 3])];;
// [
//   [ 1, 2, 3 ],
//   [ 2, 1, 3 ],
//   [ 1, 3, 2 ],
//   [ 3, 1, 2 ],
//   [ 2, 3, 1 ],
//   [ 3, 2, 1 ]
// ]
