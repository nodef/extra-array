function mapTo(arr, fn, ths, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=bgn; i<end; i++)
    z[z0++] = fn.call(ths, arr[i], i, arr);
  return z;
};
module.exports = mapTo;
