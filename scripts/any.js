function any(arr, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(arr[i]) return true;
  return false;
};
module.exports = any;
