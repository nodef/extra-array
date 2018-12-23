function everyOf(arr, fn, ths, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(!fn.call(ths, arr[i], i, arr)) return false;
  return true;
};
module.exports = everyOf;
