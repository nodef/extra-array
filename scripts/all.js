function allOf(arr, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(!arr[i]) return false;
  return true;
};
module.exports = allOf;
