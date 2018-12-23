function includesIt(arr, val, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(arr[i]===val) return true;
  return false;
};
module.exports = includesIt;
