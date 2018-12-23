function reduceBy(arr, fn, acc, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    acc = acc!==undefined? fn(acc, arr[i], i, arr):arr[i];
  return acc;
};
module.exports = reduceBy;
