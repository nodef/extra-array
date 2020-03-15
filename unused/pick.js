function pick(arr, idx, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i of idx)
    z[z0++] = i>=bgn && i<end? arr[i]:undefined;
  return z;
};
module.exports = pick;
