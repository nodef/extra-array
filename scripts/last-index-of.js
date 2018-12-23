function lastIndexOf(arr, val, bgn=arr.length-1, end=-1) {
  for(var i=bgn; i>end; i--)
    if(arr[i]===val) return i;
  return -1;
};
module.exports = lastIndexOf;
