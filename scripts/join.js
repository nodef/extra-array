function joinTo(arr, sep=',', bgn=0, end=arr.length, z='') {
  var zl = z.length;
  for(var i=bgn; i<end; i++)
    z += arr[i]+sep;
  return z.length>zl? z.substring(0, z.length-sep.length):z;
};
module.exports = joinTo;
