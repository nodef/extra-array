function sumOf(arr, bgn=0, end=arr.length) {
  var z = 0;
  for(var i=bgn; i<end; i++)
    z += arr[i];
  return z;
};
module.exports = sumOf;
