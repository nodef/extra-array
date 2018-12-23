function indexFor(arr, val, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(arr[i]===val) return i;
  return -1;
};
module.exports = indexFor;
