function reverseTo(arr, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=end-1; i>=bgn; i--)
    z[z0++] = arr[i];
  return z;
};
module.exports = reverseTo;
