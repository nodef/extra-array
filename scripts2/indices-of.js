function indicesOf(arr, val, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=bgn; i<end; i++)
    if(arr[i]===val) z[z0++] = i;
  return z;
};
module.exports = indicesOf;
