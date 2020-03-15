function includesOnly(arr, val, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(arr[i]!==val) return false;
  return true;
};
module.exports = includesOnly;
