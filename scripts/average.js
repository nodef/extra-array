const sumOf = require('array-sumof');
function average(arr, bgn=0, end=arr.length) {
  var n = end-bgn;
  return n? sumOf(arr, bgn, end)/n:0;
};
module.exports = average;
