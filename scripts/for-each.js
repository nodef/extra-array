function forEachOf(arr, fn, ths, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    fn.call(ths, arr[i], i, arr);
};
module.exports = forEachOf;
