function maxOf(arr, bgn=0, end=arr.length) {
  var z = -Infinity;
  for(var i=bgn; i<end; i++)
    z = arr[i]>z? arr[i]:z;
  return z;
};
module.exports = maxOf;
