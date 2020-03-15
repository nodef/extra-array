function count(arr, val, bgn=0, end=arr.length) {
  var z = 0;
  for(var i=bgn; i<end; i++)
    if(arr[i]===val) z++;
  return z;
};
module.exports = count;
