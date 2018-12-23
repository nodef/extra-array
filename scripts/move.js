const copyTo = require('array-copyto');
function moveTo(arr, val=0, bgn=0, end=arr.length, z=[], z0=z.length, z1=z0+(end-bgn)) {
  copyTo(arr, bgn, end, z, z0, z1);
  arr.fill(val, bgn, end);
  return z;
};
module.exports = moveTo;
